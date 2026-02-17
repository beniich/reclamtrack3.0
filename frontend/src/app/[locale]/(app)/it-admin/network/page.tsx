'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { api } from '@/lib/api';
import { Activity, Plus, Search } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface NetworkDevice {
  _id: string;
  name: string;
  type: string;
  ipAddress: string;
  currentMetrics?: {
    cpuUsage: number;
    memoryUsage: number;
    isOnline: boolean;
    lastChecked: Date;
  };
}

export default function NetworkPage() {
  const [devices, setDevices] = useState<NetworkDevice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDevices();
  }, []);

  const loadDevices = async () => {
    try {
      const res = await api.get('/api/network/devices');
      setDevices(res.data.devices || []);
    } catch (error) {
      console.error('Failed to load network devices:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDeviceTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      router: 'bg-blue-100 text-blue-800',
      switch: 'bg-green-100 text-green-800',
      firewall: 'bg-red-100 text-red-800',
      access_point: 'bg-purple-100 text-purple-800',
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Network Monitoring</h1>
          <p className="text-gray-600 mt-1">Monitor your network infrastructure</p>
        </div>
        <div className="flex gap-2">
          <Link href="/it-admin/network/scan">
            <Button variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50">
              <Search className="mr-2 h-4 w-4" />
              Discover
            </Button>
          </Link>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Plus className="mr-2 h-4 w-4" />
            Add Device
          </Button>
        </div>
      </div>

      {/* Devices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {devices.map((device) => (
          <Card key={device._id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{device.name}</CardTitle>
                  <p className="text-sm text-gray-500 font-mono">{device.ipAddress}</p>
                </div>
                <div className="flex items-center gap-2">
                  {device.currentMetrics?.isOnline ? (
                    <span className="flex items-center gap-1 text-green-600 text-xs">
                      <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
                      Online
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-red-600 text-xs">
                      <span className="h-2 w-2 bg-red-500 rounded-full"></span>
                      Offline
                    </span>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {/* Type Badge */}
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDeviceTypeColor(device.type)}`}>
                  {device.type.replace('_', ' ').toUpperCase()}
                </span>

                {/* Metrics */}
                {device.currentMetrics && (
                  <div className="space-y-2">
                    {/* CPU Usage */}
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">CPU</span>
                        <span className="font-medium">{device.currentMetrics.cpuUsage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all ${
                            device.currentMetrics.cpuUsage > 80
                              ? 'bg-red-600'
                              : device.currentMetrics.cpuUsage > 60
                              ? 'bg-yellow-600'
                              : 'bg-green-600'
                          }`}
                          style={{ width: `${device.currentMetrics.cpuUsage}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Memory Usage */}
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Memory</span>
                        <span className="font-medium">{device.currentMetrics.memoryUsage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all ${
                            device.currentMetrics.memoryUsage > 80
                              ? 'bg-red-600'
                              : device.currentMetrics.memoryUsage > 60
                              ? 'bg-yellow-600'
                              : 'bg-green-600'
                          }`}
                          style={{ width: `${device.currentMetrics.memoryUsage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="pt-3 border-t flex gap-2">
                  <Button variant="outline" className="flex-1 text-sm">
                    <Activity className="mr-2 h-4 w-4" />
                    Metrics
                  </Button>
                  <Button variant="ghost" className="flex-1 text-sm">
                    Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {devices.length === 0 && (
        <Card className="py-12">
          <CardContent className="text-center">
            <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No network devices</h3>
            <p className="text-gray-600 mb-4">Add your first network device to start monitoring</p>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="mr-2 h-4 w-4" />
              Add First Device
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
