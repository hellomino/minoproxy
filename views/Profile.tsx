import React from 'react';
import { User, Language } from '../types';
import { CrownIcon, LogOutIcon, UserIcon } from '../components/Icons';
import { TRANSLATIONS } from '../constants';

interface ProfileProps {
  user: User | null;
  onLogout: () => void;
  onLogin: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof TRANSLATIONS['en']) => string;
}

const Profile: React.FC<ProfileProps> = ({ user, onLogout, onLogin, language, setLanguage, t }) => {
  return (
    <div className="flex flex-col h-full bg-slate-50 p-6 overflow-hidden">
      <div className="w-full max-w-md mx-auto h-full flex flex-col">
          <div className="mb-6 shrink-0">
            <h2 className="text-2xl font-bold text-slate-800">{t('myAccount')}</h2>
            <p className="text-slate-500 text-sm">{t('manageSub')}</p>
          </div>

          {/* User Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6 relative overflow-hidden shrink-0">
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-bl-full -mr-4 -mt-4 z-0"></div>
            
            <div className="relative z-10 flex items-center gap-4 mb-4">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${user ? 'bg-slate-100 text-slate-400' : 'bg-slate-200 text-slate-500'}`}>
                    <UserIcon className="w-8 h-8" />
                </div>
                <div>
                    <div className="font-bold text-lg text-slate-800">{user ? user.username : t('guestUser')}</div>
                    <div className="text-xs text-slate-400">{user ? user.email : t('notLoggedIn')}</div>
                </div>
            </div>
            
            {user ? (
              <div className="relative z-10 bg-slate-50 rounded-xl p-3 flex justify-between items-center border border-slate-100">
                  <div>
                      <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">{t('currentPlan')}</div>
                      <div className={`font-bold ${user.plan === 'FREE' ? 'text-slate-600' : 'text-indigo-600'}`}>
                          {user.plan} {user.plan !== 'FREE' && t('member')}
                      </div>
                  </div>
                  {user.plan === 'FREE' && (
                      <button className="bg-indigo-600 text-white text-xs px-3 py-1.5 rounded-lg font-medium shadow-md shadow-indigo-200">
                          {t('upgrade')}
                      </button>
                  )}
              </div>
            ) : (
              <div className="relative z-10">
                <button 
                  onClick={onLogin}
                  className="w-full bg-indigo-600 text-white text-sm font-bold py-3 rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-500 transition-colors"
                >
                  {t('loginRegister')}
                </button>
              </div>
            )}
          </div>

          {/* Language Switcher */}
          <div className="bg-white rounded-xl p-4 mb-6 shadow-sm border border-slate-100 shrink-0">
            <label className="text-xs font-bold text-slate-700 block mb-2">{t('language')}</label>
            <div className="flex gap-2">
                {[
                    { code: 'zh', label: '中文' }, 
                    { code: 'en', label: 'EN' }, 
                    { code: 'ru', label: 'RU' }, 
                    { code: 'pt', label: 'PT' }
                ].map((lang) => (
                    <button
                        key={lang.code}
                        onClick={() => setLanguage(lang.code as Language)}
                        className={`flex-1 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                            language === lang.code 
                            ? 'bg-indigo-50 border-indigo-500 text-indigo-700' 
                            : 'bg-slate-50 border-transparent text-slate-500 hover:bg-slate-100'
                        }`}
                    >
                        {lang.label}
                    </button>
                ))}
            </div>
          </div>

          {/* Subscription Options */}
          <h3 className="font-bold text-slate-700 mb-3 text-sm shrink-0">{t('subPlans')}</h3>
          <div className="space-y-3 flex-1 overflow-y-auto no-scrollbar pb-4 min-h-0">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-4 text-white shadow-lg shadow-indigo-200 relative overflow-hidden group cursor-pointer transition-transform hover:scale-[1.02]">
                <div className="absolute top-0 right-0 p-2 opacity-10 transform translate-x-4 -translate-y-2">
                    <CrownIcon className="w-24 h-24" />
                </div>
                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-2">
                        <span className="bg-white/20 text-[10px] px-2 py-0.5 rounded font-medium">{t('recommended')}</span>
                        <CrownIcon className="w-5 h-5" />
                    </div>
                    <h4 className="text-lg font-bold">Pro Plan</h4>
                    <div className="text-2xl font-bold mb-1">$4.99<span className="text-sm font-normal opacity-80">/mo</span></div>
                    <ul className="text-xs space-y-1 opacity-90 mb-3">
                        <li>• Access to all 50+ nodes</li>
                        <li>• Smart routing optimization</li>
                        <li>• 4K streaming support</li>
                    </ul>
                    <button className="w-full bg-white text-indigo-600 text-xs font-bold py-2 rounded-lg">{t('selectPlan')}</button>
                </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-slate-100 text-slate-600 shadow-sm relative overflow-hidden group cursor-pointer transition-transform hover:scale-[1.02]">
                 <div className="relative z-10">
                    <h4 className="text-lg font-bold text-slate-800">Ultra Plan</h4>
                    <div className="text-2xl font-bold mb-1 text-slate-800">$9.99<span className="text-sm font-normal opacity-60">/mo</span></div>
                    <ul className="text-xs space-y-1 text-slate-500 mb-3">
                        <li>• Dedicated IP Address</li>
                        <li>• Priority Support</li>
                        <li>• Multi-device (up to 10)</li>
                    </ul>
                    <button className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold py-2 rounded-lg transition-colors">{t('selectPlan')}</button>
                </div>
            </div>
          </div>

          {user && (
            <button 
              onClick={onLogout}
              className="mt-4 flex items-center justify-center gap-2 w-full py-3 text-red-500 bg-red-50 hover:bg-red-100 rounded-xl font-medium transition-colors text-sm shrink-0"
            >
              <LogOutIcon className="w-4 h-4" />
              {t('logout')}
            </button>
          )}
      </div>
    </div>
  );
};

export default Profile;