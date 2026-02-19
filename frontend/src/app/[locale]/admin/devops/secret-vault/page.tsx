'use client';

import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import api from '@/lib/api';
import {
    AlertCircle,
    Clock,
    ExternalLink,
    Eye,
    EyeOff,
    Key,
    Lock,
    Plus,
    RefreshCw,
    Search,
    ShieldCheck,
    Trash2
} from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface Secret {
  _id: string;
  name: string;
  category: string;
  environment: string;
  description: string;
  lastAccessed: string;
  lastRotation: string;
  expiresAt: string;
}

export default function SecretVaultPage() {
  const [secrets, setSecrets] = useState<Secret[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [revealedSecret, setRevealedSecret] = useState<string | null>(null);
  const [revealedValue, setRevealedValue] = useState<string>('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newSecret, setNewSecret] = useState({
    name: '',
    value: '',
    category: 'API_KEY',
    environment: 'production',
    description: ''
  });

  useEffect(() => {
    loadSecrets();
  }, []);

  const loadSecrets = async () => {
    try {
      const res = await api.get('/api/security/secrets');
      if (res.data.success) {
        setSecrets(res.data.data);
      }
    } catch (error) {
      toast.error('Failed to load secrets');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    try {
      const res = await api.post('/api/security/secrets', newSecret);
      if (res.data.success) {
        toast.success('Secret created successfully');
        setIsCreateOpen(false);
        setNewSecret({ name: '', value: '', category: 'API_KEY', environment: 'production', description: '' });
        loadSecrets();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Creation failed');
    }
  };

  const handleReveal = async (id: string) => {
    if (revealedSecret === id) {
      setRevealedSecret(null);
      setRevealedValue('');
      return;
    }

    try {
      const res = await api.get(`/api/security/secrets/${id}/reveal`);
      if (res.data.success) {
        setRevealedSecret(id);
        setRevealedValue(res.data.data.value);
        toast.success('Secret revealed');
      }
    } catch (error) {
      toast.error('Access denied or failed to reveal');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this secret? This cannot be undone.')) return;
    try {
      await api.delete(`/api/security/secrets/${id}`);
      toast.success('Secret deleted');
      loadSecrets();
    } catch (error) {
      toast.error('Deletion failed');
    }
  };

  const filteredSecrets = secrets.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.category.toLowerCase().includes(search.toLowerCase())
  );

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'API_KEY': return <Key className="w-4 h-4" />;
      case 'DB_PASSWORD': return <Lock className="w-4 h-4" />;
      case 'SSH_KEY': return <ExternalLink className="w-4 h-4" />;
      default: return <Key className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-black tracking-tight flex items-center gap-3">
            <div className="bg-primary p-2 rounded-xl text-white shadow-lg shadow-primary/20">
              <ShieldCheck className="w-8 h-8" />
            </div>
            Secret Vault
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Enterprise-grade credential management & rotation</p>
        </div>

        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="font-bold shadow-xl shadow-primary/20">
              <Plus className="w-4 h-4 mr-2" />
              New Secret
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Secret</DialogTitle>
              <DialogDescription>
                Store a sensitive value in the encrypted vault.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-bold">Secret Name</label>
                <Input
                  placeholder="e.g. STRIPE_PROD_KEY"
                  value={newSecret.name}
                  onChange={(e) => setNewSecret({...newSecret, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold">Value (will be encrypted)</label>
                <Input
                  type="password"
                  placeholder="sk_test_..."
                  value={newSecret.value}
                  onChange={(e) => setNewSecret({...newSecret, value: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold">Category</label>
                  <Select
                    value={newSecret.category}
                    onValueChange={(v) => setNewSecret({...newSecret, category: v})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="API_KEY">API Key</SelectItem>
                      <SelectItem value="DB_PASSWORD">DB Password</SelectItem>
                      <SelectItem value="SSL_CERT">SSL Certificate</SelectItem>
                      <SelectItem value="SSH_KEY">SSH Key</SelectItem>
                      <SelectItem value="OTHER">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold">Environment</label>
                  <Select
                    value={newSecret.environment}
                    onValueChange={(v) => setNewSecret({...newSecret, environment: v})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Env" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="production">Production</SelectItem>
                      <SelectItem value="staging">Staging</SelectItem>
                      <SelectItem value="development">Development</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold">Description</label>
                <Input
                  placeholder="What is this used for?"
                  value={newSecret.description}
                  onChange={(e) => setNewSecret({...newSecret, description: e.target.value})}
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleCreate}>Store Secret</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-primary/5 border-primary/10">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-primary uppercase tracking-wider">Total Secrets</p>
                <p className="text-3xl font-black mt-1">{secrets.length}</p>
              </div>
              <div className="bg-primary/10 p-3 rounded-xl text-primary font-bold">Vault</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Active Rotations</p>
                <p className="text-3xl font-black mt-1">4</p>
              </div>
              <RefreshCw className="text-blue-500 w-8 h-8 opacity-20" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Expiring Soon</p>
                <p className="text-3xl font-black mt-1">0</p>
              </div>
              <AlertCircle className="text-amber-500 w-8 h-8 opacity-20" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <Search className="text-slate-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search secrets by name or category..."
          className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-medium"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {loading ? (
          <div className="col-span-full py-20 text-center text-slate-500 font-bold animate-pulse">
            Accessing Vault...
          </div>
        ) : filteredSecrets.length > 0 ? (
          filteredSecrets.map((secret) => (
            <Card key={secret._id} className="group hover:border-primary/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-lg text-slate-600 dark:text-slate-400">
                      {getCategoryIcon(secret.category)}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{secret.name}</h3>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="outline" className="text-[10px] uppercase font-black tracking-tighter">
                          {secret.category}
                        </Badge>
                        <Badge className={`${secret.environment === 'production' ? 'bg-red-500' : 'bg-blue-500'} text-[10px] uppercase font-black tracking-tighter`}>
                          {secret.environment}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="sm" onClick={() => handleReveal(secret._id)}>
                      {revealedSecret === secret._id ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600" onClick={() => handleDelete(secret._id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  {revealedSecret === secret._id ? (
                    <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-lg border border-primary/20 font-mono text-sm break-all flex justify-between items-center animate-in slide-in-from-top-2">
                      <span className="text-primary font-bold">{revealedValue}</span>
                      <Button variant="ghost" size="sm" onClick={() => {
                        navigator.clipboard.writeText(revealedValue);
                        toast.success('Copied to clipboard');
                      }}>Copy</Button>
                    </div>
                  ) : (
                    <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-lg border border-slate-100 dark:border-slate-800 font-mono text-sm text-slate-300">
                      ••••••••••••••••••••••••••••••••
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3" />
                      Last Access: {secret.lastAccessed ? new Date(secret.lastAccessed).toLocaleTimeString() : 'Never'}
                    </div>
                    <div className="flex items-center gap-2">
                       <RefreshCw className="w-3 h-3" />
                       Rotation: {new Date(secret.lastRotation).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full py-20 text-center bg-slate-50 dark:bg-slate-900 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
            <Lock className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">No secrets found</h3>
            <p className="text-slate-500">Search for something else or create a new secret.</p>
          </div>
        )}
      </div>

      <div className="p-6 bg-amber-500/5 rounded-3xl border border-amber-500/10 flex gap-4 items-start">
        <AlertCircle className="text-amber-500 w-6 h-6 flex-shrink-0" />
        <div className="text-sm">
          <p className="font-bold text-amber-500">Security Recommendation</p>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Always use different secrets for staging and production environments. Secrets with "production" environment tags are monitored with stricter audit logging.
          </p>
        </div>
      </div>
    </div>
  );
}
