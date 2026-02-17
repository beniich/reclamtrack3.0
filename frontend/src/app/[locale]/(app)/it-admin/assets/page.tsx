'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { api } from '@/lib/api';
import { Laptop, Network, Plus, Search, Server } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ITAsset {
  _id: string;
  assetTag: string;
  name: string;
  type: string;
  status: string;
  ipAddress?: string;
  assignedTo?: {
    firstName: string;
    lastName: string;
  };
}

export default function ITAssetsPage() {
  const [assets, setAssets] = useState<ITAsset[]>([]);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAssets();
  }, [filterType]);

  const loadAssets = async () => {
    try {
      const params: any = {};
      if (filterType !== 'all') params.type = filterType;

      const res = await api.get('/api/it-assets', { params });
      setAssets(res.data.assets || []);
    } catch (error) {
      console.error('Failed to load assets:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAssets = assets.filter((asset) =>
    asset.name.toLowerCase().includes(search.toLowerCase()) ||
    asset.assetTag.toLowerCase().includes(search.toLowerCase()) ||
    asset.ipAddress?.toLowerCase().includes(search.toLowerCase())
  );

  const getAssetIcon = (type: string) => {
    switch (type) {
      case 'server':
        return <Server className="h-5 w-5 text-blue-600" />;
      case 'workstation':
      case 'laptop':
        return <Laptop className="h-5 w-5 text-green-600" />;
      case 'network_device':
        return <Network className="h-5 w-5 text-purple-600" />;
      default:
        return <Server className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const statusColors: Record<string, string> = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      maintenance: 'bg-yellow-100 text-yellow-800',
      retired: 'bg-red-100 text-red-800',
      broken: 'bg-red-200 text-red-900',
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[status] || 'bg-gray-100 text-gray-800'}`}>
        {status}
      </span>
    );
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">IT Assets</h1>
          <p className="text-gray-600 mt-1">Manage your IT inventory</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" />
          Add Asset
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name, tag, or IP address..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Type Filter */}
            <select
              aria-label="Filter by type"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border rounded-md bg-white"
            >
              <option value="all">All Types</option>
              <option value="server">Servers</option>
              <option value="workstation">Workstations</option>
              <option value="laptop">Laptops</option>
              <option value="network_device">Network Devices</option>
              <option value="printer">Printers</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Assets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssets.map((asset) => (
          <Card key={asset._id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {getAssetIcon(asset.type)}
                  <div>
                    <CardTitle className="text-lg">{asset.name}</CardTitle>
                    <p className="text-sm text-gray-500">{asset.assetTag}</p>
                  </div>
                </div>
                {getStatusBadge(asset.status)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium capitalize">{asset.type.replace('_', ' ')}</span>
                </div>
                {asset.ipAddress && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">IP Address:</span>
                    <span className="font-medium font-mono text-xs">{asset.ipAddress}</span>
                  </div>
                )}
                {asset.assignedTo && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Assigned to:</span>
                    <span className="font-medium">
                      {asset.assignedTo.firstName} {asset.assignedTo.lastName}
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-4 border-t flex gap-2">
                <Button variant="outline" className="flex-1 text-sm">
                  View Details
                </Button>
                <Button variant="ghost" className="flex-1 text-sm">
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredAssets.length === 0 && (
        <Card className="py-12">
          <CardContent className="text-center">
            <Server className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No assets found</h3>
            <p className="text-gray-600 mb-4">
              {search ? 'Try adjusting your search or filters' : 'Get started by adding your first asset'}
            </p>
            {!search && (
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="mr-2 h-4 w-4" />
                Add First Asset
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
