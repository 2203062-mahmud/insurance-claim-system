const fs = require('fs');

let code = fs.readFileSync('src/frontend/src/components/claimant/ClaimantPortal.tsx', 'utf8');

const replacement = `
              {(() => {
                let imgUrl = '';
                let icon = '';
                let label = '';
                
                switch(p.type) {
                  case 'AUTO':
                    imgUrl = 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=800&auto=format&fit=crop';
                    icon = 'satellite_alt';
                    label = 'IoT Beacon Active';
                    break;
                  case 'HEALTH':
                    imgUrl = 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop';
                    icon = 'monitor_heart';
                    label = 'Vital Sync Connected';
                    break;
                  case 'HOME':
                    imgUrl = 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop';
                    icon = 'home_iot_device';
                    label = 'Smart Security Linked';
                    break;
                  case 'LIFE':
                    imgUrl = 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=800&auto=format&fit=crop';
                    icon = 'admin_panel_settings';
                    label = 'Biometric ID Verified';
                    break;
                  default:
                    imgUrl = 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=800&auto=format&fit=crop';
                    icon = 'verified';
                    label = 'Coverage Active';
                    break;
                }
                
                return (
                  <div className="relative w-full h-36 rounded-lg overflow-hidden mb-space-md bg-surface-container-lowest">
                    <img className="w-full h-full object-cover object-center opacity-40 mix-blend-luminosity hover:opacity-60 transition-opacity" src={imgUrl} />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-surface-container-low/40 to-transparent"></div>
                    <div className="absolute bottom-space-xs left-space-md right-space-md flex items-center justify-between">
                      <div className="flex items-center gap-space-xs">
                        <span className="material-symbols-outlined text-primary text-[18px]">{icon}</span>
                        <span className="font-code-xs text-code-xs text-on-surface">{label}</span>
                      </div>
                    </div>
                  </div>
                );
              })()}
`;

// Extract the target block to replace using regex
const regex = /\{p\.type === 'AUTO' && \(\s*<div className="relative w-full h-36.*?<\/div>\s*\)\}/s;
code = code.replace(regex, replacement.trim());

fs.writeFileSync('src/frontend/src/components/claimant/ClaimantPortal.tsx', code);
