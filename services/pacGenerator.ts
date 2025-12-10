import { ProxyMode, ProxyNode } from '../types';
import { CN_DOMAIN_SUFFIXES } from '../constants';

/**
 * Generates the PAC (Proxy Auto-Config) script content.
 * In a real Chrome Extension, this string is passed to:
 * chrome.proxy.settings.set({ value: { mode: "pac_script", pacScript: { data: ... } } })
 */
export const generatePacScript = (node: ProxyNode, mode: ProxyMode): string => {
  const proxyString = `HTTPS ${node.host}:${node.port}; DIRECT`;
  
  const smartModeLogic = `
    // Check for local LAN addresses
    if (isInNet(dnsResolve(host), "10.0.0.0", "255.0.0.0") ||
        isInNet(dnsResolve(host), "172.16.0.0", "255.240.0.0") ||
        isInNet(dnsResolve(host), "192.168.0.0", "255.255.0.0") ||
        isInNet(dnsResolve(host), "127.0.0.0", "255.0.0.0")) {
        return "DIRECT";
    }

    // Check for CN domains (Smart Mode)
    var cnDomains = ${JSON.stringify(CN_DOMAIN_SUFFIXES)};
    for (var i = 0; i < cnDomains.length; i++) {
        if (shExpMatch(host, "*." + cnDomains[i]) || host === cnDomains[i]) {
            return "DIRECT";
        }
    }
  `;

  const globalModeLogic = `
    // Check for local LAN addresses only
    if (isInNet(dnsResolve(host), "10.0.0.0", "255.0.0.0") ||
        isInNet(dnsResolve(host), "172.16.0.0", "255.240.0.0") ||
        isInNet(dnsResolve(host), "192.168.0.0", "255.255.0.0") ||
        isInNet(dnsResolve(host), "127.0.0.0", "255.0.0.0")) {
        return "DIRECT";
    }
  `;

  return `
    function FindProxyForURL(url, host) {
      ${mode === ProxyMode.SMART ? smartModeLogic : globalModeLogic}
      
      // Default return the proxy
      return "${proxyString}";
    }
  `;
};
