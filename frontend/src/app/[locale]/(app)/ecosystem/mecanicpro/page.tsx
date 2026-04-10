"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  WrenchScrewdriverIcon, 
  TruckIcon, 
  CpuChipIcon, 
  BoltIcon,
  ArrowPathIcon,
  ExclamationTriangleIcon,
  PresentationChartLineIcon,
  CircleStackIcon
} from '@heroicons/react/24/outline';

export default function MecanicProDashboard() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-neutral-400 font-mono p-4 md:p-8 selection:bg-orange-500/30">
      {/* Laser Sweep bar simulation */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-20 blur-sm pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-orange-500 flex items-center justify-center rounded-sm">
              <BoltIcon className="w-6 h-6 text-black" />
            </div>
            <h1 className="text-2xl font-black tracking-tighter text-white uppercase italic">Mecanic<span className="text-orange-500">Pro</span></h1>
          </div>
          <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-600">Workshop Intelligence System • V5.2.0-STABLE</p>
        </div>
        <div className="flex gap-4">
          <div className="px-4 py-2 border border-white/5 bg-neutral-900 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-[10px] uppercase font-bold text-white tracking-widest">Link_Established</span>
          </div>
          <button className="px-6 py-2 bg-white text-black text-[11px] font-black uppercase tracking-widest hover:bg-orange-500 transition-colors">
            Emergency_Lockdown
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Telemetry Section */}
        <div className="lg:col-span-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: "Vehicles_In_Progress", value: "14", max: "20", color: "#FF6B00", icon: TruckIcon },
              { label: "Active_Diagnostics", value: "38", max: "50", color: "#00eefc", icon: CpuChipIcon },
              { label: "Daily_Queue_Load", value: "9", max: "15", color: "#ff7351", icon: ArrowPathIcon },
            ].map((stat, i) => (
              <div key={i} className="bg-neutral-950 border border-white/5 p-6 relative overflow-hidden group">
                <div className="relative z-10">
                  <stat.icon className="w-5 h-5 mb-4" style={{ color: stat.color }} />
                  <p className="text-[9px] uppercase tracking-widest text-neutral-600 mb-1">{stat.label}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-white">{stat.value}</span>
                    <span className="text-[10px] text-neutral-700">/ {stat.max}</span>
                  </div>
                </div>
                {/* Background "Gauge" line */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-neutral-900">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(parseInt(stat.value)/parseInt(stat.max))*100}%` }}
                    transition={{ duration: 1.5, delay: i * 0.2 }}
                    className="h-full" 
                    style={{ backgroundColor: stat.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Revenue Node */}
          <div className="bg-neutral-950 border border-white/5 p-8 relative">
             <div className="absolute top-0 right-0 p-4">
               <PresentationChartLineIcon className="w-6 h-6 text-neutral-800" />
             </div>
             <p className="text-[10px] uppercase tracking-widest text-neutral-500 mb-6">Monthly_Revenue_Telemetry</p>
             <div className="flex flex-col items-center justify-center py-10">
               <h2 className="text-6xl font-black text-white tracking-widest">142,850.00</h2>
               <div className="flex items-center gap-4 mt-4">
                 <span className="text-orange-500 font-bold text-xs font-mono">▲ 14.8%</span>
                 <span className="text-neutral-700 text-[10px] uppercase tracking-widest">Performance_Metric_Normal</span>
               </div>
             </div>
             <div className="grid grid-cols-2 border-t border-white/5 pt-6 mt-6">
               <div className="text-center border-r border-white/5">
                 <p className="text-[9px] text-neutral-600 uppercase mb-1">Pending_Node</p>
                 <p className="text-orange-500 font-bold">12,400 €</p>
               </div>
               <div className="text-center">
                 <p className="text-[9px] text-neutral-600 uppercase mb-1">Invoices_Processed</p>
                 <p className="text-white font-bold">428 Units</p>
               </div>
             </div>
          </div>
        </div>

        {/* System Trace Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-neutral-950 border border-white/5 p-6 h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-neutral-500">Live_System_Trace</p>
              <div className="w-2 h-2 rounded-full bg-orange-500/20" />
            </div>
            
            <div className="space-y-4 flex-grow font-mono text-[10px]">
              {[
                { time: "14:12:08", tag: "SEC_SCAN", msg: "Access verified: Node_7", color: "text-neutral-500" },
                { time: "14:24:22", tag: "DB_NODE", msg: "Connection stable: IO_10", color: "text-neutral-500" },
                { time: "14:31:01", tag: "DATA_SYNC", msg: "428 Clients Loaded", color: "text-cyan-400" },
                { time: "15:05:44", tag: "OP_LEVEL", msg: "Daily queue items incremented", color: "text-orange-500" },
                { time: "15:10:02", tag: "WAR_CRIT", msg: "Oil_Pressure_Sensor: Check_Req", color: "text-red-500" },
              ].map((log, i) => (
                <div key={i} className="flex gap-4 border-l border-neutral-800 pl-4 relative">
                  <div className="absolute -left-[4.5px] top-1 w-2 h-2 rounded-full bg-neutral-900 border border-neutral-800" />
                  <span className="text-neutral-700 font-bold whitespace-nowrap">{log.time}</span>
                  <div className="flex flex-col">
                    <span className={`font-black tracking-widest ${log.color}`}>{log.tag}</span>
                    <span className="text-neutral-500">{log.msg}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-orange-500/5 border border-orange-500/10 rounded-sm">
               <div className="flex items-center gap-2 mb-2">
                 <ExclamationTriangleIcon className="w-4 h-4 text-orange-500" />
                 <span className="text-[10px] font-black text-white uppercase tracking-widest">AI_Optimization_Advice</span>
               </div>
               <p className="text-[10px] leading-relaxed text-neutral-400">
                 Efficiency can be increased by 12% if "Station_4" tasks are re-allocated to "Node_ServerB".
               </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Nodes */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: CircleStackIcon, label: "Core_Storage", status: "84%", color: "text-cyan-400" },
          { icon: BoltIcon, label: "Engine_Load", status: "OPTIMAL", color: "text-orange-500" },
          { icon: WrenchScrewdriverIcon, label: "Maintenance", status: "SCHED", color: "text-neutral-400" },
          { icon: TruckIcon, label: "Fleet_Health", status: "98.2%", color: "text-cyan-400" },
        ].map((node, i) => (
          <div key={i} className="bg-neutral-950 border border-white/5 p-4 flex items-center gap-4 hover:border-white/20 transition-all cursor-crosshair">
            <node.icon className={`w-5 h-5 ${node.color}`} />
            <div>
              <p className="text-[9px] text-neutral-600 uppercase font-black tracking-widest">{node.label}</p>
              <p className="text-xs text-white font-bold tracking-tighter">{node.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
