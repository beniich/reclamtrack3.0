'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { api } from '@/lib/api';
import { Plus, Search, Ticket } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ITTicket {
  _id: string;
  ticketNumber: string;
  title: string;
  description: string;
  category: string;
  priority: string;
  status: string;
  requestedBy: {
    firstName: string;
    lastName: string;
  };
  assignedTo?: {
    firstName: string;
    lastName: string;
  };
  createdAt: string;
}

export default function ITTicketsPage() {
  const [tickets, setTickets] = useState<ITTicket[]>([]);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTickets();
  }, [filterStatus]);

  const loadTickets = async () => {
    try {
      const params: any = {};
      if (filterStatus !== 'all') params.status = filterStatus;

      const res = await api.get('/api/it-tickets', { params });
      setTickets(res.data.tickets || []);
    } catch (error) {
      console.error('Failed to load tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTickets = tickets.filter((ticket) =>
    ticket.title.toLowerCase().includes(search.toLowerCase()) ||
    ticket.ticketNumber.toLowerCase().includes(search.toLowerCase())
  );

  const getPriorityBadge = (priority: string) => {
    const colors: Record<string, string> = {
      critical: 'bg-red-600 text-white',
      urgent: 'bg-orange-600 text-white',
      high: 'bg-yellow-600 text-white',
      medium: 'bg-blue-600 text-white',
      low: 'bg-gray-600 text-white',
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors[priority] || 'bg-gray-600 text-white'}`}>
        {priority.toUpperCase()}
      </span>
    );
  };

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      new: 'bg-blue-100 text-blue-800',
      assigned: 'bg-purple-100 text-purple-800',
      in_progress: 'bg-yellow-100 text-yellow-800',
      pending: 'bg-orange-100 text-orange-800',
      resolved: 'bg-green-100 text-green-800',
      closed: 'bg-gray-100 text-gray-800',
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors[status] || 'bg-gray-100 text-gray-800'}`}>
        {status.replace('_', ' ').toUpperCase()}
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
          <h1 className="text-3xl font-bold">IT Helpdesk</h1>
          <p className="text-gray-600 mt-1">Manage IT support tickets</p>
        </div>
        <Button className="bg-orange-600 hover:bg-orange-700">
          <Plus className="mr-2 h-4 w-4" />
          Create Ticket
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
                placeholder="Search tickets..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border rounded-md bg-white"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="assigned">Assigned</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Tickets List */}
      <div className="space-y-4">
        {filteredTickets.map((ticket) => (
          <Card key={ticket._id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-mono text-gray-500">{ticket.ticketNumber}</span>
                    {getPriorityBadge(ticket.priority)}
                    {getStatusBadge(ticket.status)}
                  </div>
                  <CardTitle className="text-lg mb-2">{ticket.title}</CardTitle>
                  <p className="text-sm text-gray-600 line-clamp-2">{ticket.description}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <div>
                  <span className="font-medium">Requested by:</span>{' '}
                  {ticket.requestedBy.firstName} {ticket.requestedBy.lastName}
                </div>
                {ticket.assignedTo && (
                  <div>
                    <span className="font-medium">Assigned to:</span>{' '}
                    {ticket.assignedTo.firstName} {ticket.assignedTo.lastName}
                  </div>
                )}
                <div>
                  <span className="font-medium">Category:</span>{' '}
                  <span className="capitalize">{ticket.category}</span>
                </div>
                <div>
                  <span className="font-medium">Created:</span>{' '}
                  {new Date(ticket.createdAt).toLocaleDateString()}
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <Button variant="outline" className="text-sm">
                  View Details
                </Button>
                {ticket.status !== 'closed' && ticket.status !== 'resolved' && (
                  <Button variant="ghost" className="text-sm">
                    Update
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredTickets.length === 0 && (
        <Card className="py-12">
          <CardContent className="text-center">
            <Ticket className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tickets found</h3>
            <p className="text-gray-600 mb-4">
              {search ? 'Try adjusting your search or filters' : 'No IT tickets have been created yet'}
            </p>
            {!search && (
              <Button className="bg-orange-600 hover:bg-orange-700">
                <Plus className="mr-2 h-4 w-4" />
                Create First Ticket
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
