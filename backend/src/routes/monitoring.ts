import express, { Response } from 'express';
import { auth } from '../middleware/auth.js';
import { requireAdmin, requireOrganization } from '../middleware/organization.js';
import NetworkDevice from '../models/NetworkDevice.js';
import { NetworkService } from '../services/networkService.js';
import { AuthenticatedRequest } from '../types/request.js';

const router = express.Router();

// Middleware: Auth + Org required
router.use(auth, requireOrganization);

// POST /api/monitoring/scan - Scan a subnet for active hosts
router.post('/scan', requireAdmin, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { subnet } = req.body; // e.g., "192.168.1"

    if (!subnet || !/^\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(subnet)) {
      return res
        .status(400)
        .json({ error: 'Invalid subnet format. Use "xxx.xxx.xxx" (e.g., 192.168.1)' });
    }

    // Launch scan (this might take time, consider async job later)
    const scanResults = await defaultNetworkService.scanSubnet(subnet);

    // Enrich results with SNMP info (optional, or separate step)
    // For now, return basic ping results
    res.json({
      subnet,
      hostsFound: scanResults.length,
      results: scanResults,
    });
  } catch (error: any) {
    console.error('Scan failed:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/monitoring/device/:id/check - Quick check connection & SNMP
router.get('/device/:id/check', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const device = await NetworkDevice.findOne({
      _id: req.params.id,
      organizationId: req.organizationId,
    });

    if (!device) {
      return res.status(404).json({ error: 'Device not found' });
    }

    // Check Ping
    const pingRes = await NetworkService.pingHost(device.ipAddress);

    // Check SNMP if reachable
    let snmpData = {};
    if (pingRes.alive) {
      // Use community string from device config or default
      const service = new (require('../services/networkService.js').NetworkService)(
        (device as any).snmpCommunity || process.env.SNMP_COMMUNITY || 'public'
      );
      snmpData = await service.getSnmpSystemInfo(device.ipAddress);
    }

    res.json({
      device: {
        id: device._id,
        name: device.name,
        ip: device.ipAddress,
      },
      status: {
        reachable: pingRes.alive,
        responseTime: pingRes.time,
        snmp: snmpData,
      },
    });
  } catch (error: any) {
    console.error('Device check failed:', error);
    res.status(500).json({ error: error.message });
  }
});

// POST /api/monitoring/device/:id/discover - Deep Discovery & Update
router.post(
  '/device/:id/discover',
  requireAdmin,
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const device = await NetworkDevice.findOne({
        _id: req.params.id,
        organizationId: req.organizationId,
      });

      if (!device) {
        return res.status(404).json({ error: 'Device not found' });
      }

      const service = new (require('../services/networkService.js').NetworkService)(
        (device as any).snmpCommunity || process.env.SNMP_COMMUNITY || 'public'
      );

      // Full SNMP Walk (simulated via getSnmpSystemInfo for now)
      const snmpData = await service.getSnmpSystemInfo(device.ipAddress);

      // Update Device Info
      if (snmpData) {
        if (snmpData.sysName) device.name = snmpData.sysName;
        if (snmpData.sysLocation) (device as any).location = snmpData.sysLocation;
        // Update metrics
        if (snmpData.sysUpTime) {
          // Initialize currentMetrics if missing
          if (!device.currentMetrics)
            device.currentMetrics = {
              cpuUsage: 0,
              memoryUsage: 0,
              isOnline: true,
              lastChecked: new Date(),
            };
          device.currentMetrics.isOnline = true;
          device.currentMetrics.lastChecked = new Date();
          // CPU/Memory would require specific MIB OIDs per vendor
        }
        await device.save();
      }

      res.json({ message: 'Device discovered and updated', data: snmpData });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
);

export default router;
