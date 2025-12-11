
import React, { useState, useEffect } from 'react';
import { AppState, ProxyMode, ProxyNode } from '../types';
import { PowerIcon, ZapIcon, ServerIcon, ChevronRightIcon, CountryFlag } from '../components/Icons';
import { MOCK_NODES, TRANSLATIONS } from '../constants';
import { generatePacScript } from '../services/pacGenerator';
import {T} from "@/components/Toast.tsx";
import WebSocketService from "@/services/websocket.ts";
import {RespError, RespTips} from "@/services/msgcode.ts";
import {encryptString, KKK} from "@/services/aes_gcm_web.ts";

interface DashboardProps {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
  t: (key: keyof typeof TRANSLATIONS['en']) => string;
}

const Dashboard: React.FC<DashboardProps> = ({ state, setState, t }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showNodeList, setShowNodeList] = useState(false);
  let ws = WebSocketService.getInstance();
  const {showError,showInfo} = T()
    ws.on(RespError, (  data)=> {
        showError(data.code,data.data);
    })
    ws.on(RespTips, (  data)=> {
        showInfo(data.code,data.data);
    })

  // Initialize with a default node if none selected
  useEffect(() => {
    if (!state.selectedNode) {
      setState(prev => ({ ...prev, selectedNode: MOCK_NODES[0] }));
    }
  }, [state.selectedNode, setState]);

  const toggleConnection = () => {
    setIsAnimating(true);
    
    // Simulate connection delay
    setTimeout(() => {
      const newState = !state.isConnected;
      setState(prev => ({ ...prev, isConnected: newState }));
      setIsAnimating(false);

      if (newState && state.selectedNode) {
        // In a real extension, this is where we'd set chrome.proxy.settings
        const script = generatePacScript(state.selectedNode, state.mode);
        console.log("PAC Script Generated:", script);
        // chrome.proxy.settings.set({ value: { mode: "pac_script", pacScript: { data: script } }, scope: 'regular' });
      } else {
        // chrome.proxy.settings.clear({ scope: 'regular' });
      }
    }, 800);
  };

  const selectNode = (node: ProxyNode) => {
    setState(prev => ({ ...prev, selectedNode: node }));
    setShowNodeList(false);
    // If connected, we should technically reconnect to apply changes
    if (state.isConnected) {
        // Trigger a quick reconnect simulation
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 500);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 relative overflow-hidden">
        {/* Background Decorative Elements - Full Width */}
        <div className={`absolute top-0 left-0 w-full h-64 transition-colors duration-700 rounded-b-[40px] z-0 ${state.isConnected ? 'bg-indigo-600' : 'bg-slate-800'}`}></div>
        
        {/* Header / Top Right Actions */}
        <div className="absolute top-4 right-4 z-20">
            {state.user && (
                <div className="flex items-center gap-1.5 text-white/80 text-xs font-medium px-2">
                   <div className="w-2 h-2 rounded-full bg-green-400"></div>
                   {state.user.username}
                </div>
            )}
        </div>
        
        {/* Connection Status Indicator */}
        <div className="relative z-10 flex flex-col items-center pt-8 pb-4">
            <div className="text-white/80 text-xs font-medium tracking-wider mb-2">STATUS</div>
            <div className={`text-2xl font-bold transition-all duration-500 ${state.isConnected ? 'text-white' : 'text-slate-300'}`}>
                {state.isConnected ? t('statusConnected') : t('statusDisconnected')}
            </div>
            {state.isConnected && state.selectedNode && (
                <div className="mt-1 flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full backdrop-blur-sm text-xs text-white">
                    <CountryFlag code={state.selectedNode.countryCode} className="w-5 h-3.5 rounded-[1px] object-cover" />
                    <span>{state.selectedNode.host}</span>
                </div>
            )}
        </div>

        {/* Main Toggle Button */}
        <div className="relative z-10 flex justify-center my-6">
            <button
                onClick={toggleConnection}
                className={`group relative w-32 h-32 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl ${
                    state.isConnected 
                    ? 'bg-white shadow-indigo-900/50' 
                    : 'bg-slate-700 shadow-black/30'
                }`}
            >
                {/* Pulse Ring */}
                {state.isConnected && (
                    <div className="absolute inset-0 rounded-full border-4 border-white/30 animate-ping"></div>
                )}
                
                {/* Icon */}
                <PowerIcon className={`w-12 h-12 transition-all duration-500 ${
                    state.isConnected ? 'text-indigo-600 scale-110' : 'text-slate-400'
                } ${isAnimating ? 'animate-pulse' : ''}`} />
            </button>
        </div>

        {/* Info Cards Container - Constrained Width */}
        <div className="flex-1 px-5 pb-5 z-10 overflow-y-auto no-scrollbar">
            <div className="max-w-md mx-auto space-y-3">
                {/* Mode Selector */}
                <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-2 text-slate-700 font-medium text-sm">
                            <ZapIcon className="w-4 h-4 text-amber-500" />
                            <span>{t('proxyMode')}</span>
                        </div>
                    </div>
                    <div className="flex bg-slate-100 p-1 rounded-lg">
                        <button 
                            onClick={() => setState(p => ({...p, mode: ProxyMode.SMART}))}
                            className={`flex-1 py-2 text-xs font-medium rounded-md transition-all ${state.mode === ProxyMode.SMART ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'}`}
                        >
                            {t('smartMode')}
                        </button>
                        <button 
                            onClick={() => setState(p => ({...p, mode: ProxyMode.GLOBAL}))}
                            className={`flex-1 py-2 text-xs font-medium rounded-md transition-all ${state.mode === ProxyMode.GLOBAL ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'}`}
                        >
                            {t('globalMode')}
                        </button>
                    </div>
                    <div className="mt-2 text-[10px] text-slate-400 px-1">
                        {state.mode === ProxyMode.SMART 
                            ? t('smartModeDesc') 
                            : t('globalModeDesc')}
                    </div>
                </div>

                {/* Server Selector Trigger */}
                <button 
                    onClick={() => setShowNodeList(true)}
                    className="w-full bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex items-center justify-between group active:scale-[0.98] transition-transform"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 overflow-hidden relative">
                           {state.selectedNode ? (
                                <CountryFlag code={state.selectedNode.countryCode} className="w-full h-full object-cover" />
                           ) : (
                                <ServerIcon className="w-5 h-5" />
                           )}
                        </div>
                        <div className="text-left">
                            <div className="text-xs text-slate-400 font-medium">{t('currentLocation')}</div>
                            <div className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                <span>{state.selectedNode?.name || t('selectServer')}</span>
                            </div>
                        </div>
                    </div>
                    <ChevronRightIcon className="w-5 h-5 text-slate-300 group-hover:text-indigo-500 transition-colors" />
                </button>
            </div>
        </div>

        {/* Node Selection Modal Overlay */}
        {showNodeList && (
            <div className="absolute inset-0 z-50 bg-white flex flex-col animate-in slide-in-from-bottom-10 duration-200">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
                    <h2 className="font-bold text-slate-800">{t('selectServer')}</h2>
                    <button onClick={() => setShowNodeList(false)} className="text-xs bg-slate-100 px-3 py-1 rounded-full text-slate-600">{t('close')}</button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 bg-slate-50">
                    <div className="max-w-md mx-auto space-y-2">
                        {MOCK_NODES.map(node => (
                            <button
                                key={node.id}
                                onClick={() => selectNode(node)}
                                className={`w-full p-3 rounded-xl border flex items-center justify-between transition-all ${
                                    state.selectedNode?.id === node.id 
                                    ? 'bg-indigo-50 border-indigo-500 shadow-sm' 
                                    : 'bg-white border-slate-100 hover:border-indigo-200'
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-8 rounded shadow-sm overflow-hidden shrink-0 border border-slate-100">
                                        <CountryFlag code={node.countryCode} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="text-left">
                                        <div className={`text-sm font-bold ${state.selectedNode?.id === node.id ? 'text-indigo-700' : 'text-slate-700'}`}>
                                            {node.name}
                                        </div>
                                        <div className="text-[10px] text-slate-400">{node.type} • {node.host}</div>
                                    </div>
                                </div>
                                <div className={`text-xs font-bold ${node.latency < 50 ? 'text-green-500' : node.latency < 100 ? 'text-amber-500' : 'text-red-500'}`}>
                                    {node.latency}ms
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};

export default Dashboard;
