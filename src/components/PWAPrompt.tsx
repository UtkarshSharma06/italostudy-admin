import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Smartphone, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Capacitor } from '@capacitor/core';
import { useToast } from '@/hooks/use-toast';

export const PWAPrompt = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    // Don't show if we are already in a native app
    const platform = Capacitor.getPlatform();
    if (platform !== 'web') return;

    // Check if user has already dismissed the prompt
    const isDismissed = localStorage.getItem('pwa-prompt-dismissed');
    if (isDismissed) return;

    // Check if it's already installed or if it's standalone
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches 
      || (window.navigator as any).standalone 
      || document.referrer.includes('android-app://');
    
    if (isStandalone) return;

    // Fallback: Show the prompt anyway after 6 seconds to "introduce" the feature
    // even if the browser hasn't fired the beforeinstallprompt event yet.
    const fallbackTimer = setTimeout(() => {
      if (!isVisible) {
        setIsVisible(true);
      }
    }, 6000);

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      
      // If the event fires, we can show it even sooner
      setTimeout(() => {
        setIsVisible(true);
      }, 2000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      clearTimeout(fallbackTimer);
    };
  }, [isVisible]);

  const { toast } = useToast();

  const handleInstall = async () => {
    if (!deferredPrompt) {
        toast({
            title: "Installation Pending",
            description: "Your browser is still preparing the App. Please try again in a few seconds, or use the 'Add to Home Screen' option in your browser menu.",
        });
        return;
    }
    
    // Show the install prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the PWA install prompt');
      setIsVisible(false);
    }
    
    // We've used the prompt, and can't use it again
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('pwa-prompt-dismissed', 'true');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-6 right-6 z-[100] max-w-sm w-full"
        >
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
            <div className="relative p-5">
              <button 
                onClick={handleDismiss}
                className="absolute top-4 right-4 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center shrink-0">
                  <Smartphone className="w-6 h-6 text-indigo-600" />
                </div>
                <div className="flex-1 pr-6">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">
                      Install ItaloStudy
                    </h3>
                    <div className="flex items-center gap-1 px-1.5 py-0.5 bg-amber-100 dark:bg-amber-900/30 rounded text-[8px] font-black text-amber-600 uppercase tracking-widest">
                      <Sparkles className="w-2.5 h-2.5" />
                      NEW
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                    Get the full mobile experience with offline access and faster loading. Add to your home screen now!
                  </p>
                  
                  <div className="flex items-center gap-2">
                    <Button 
                      onClick={handleInstall}
                      size="sm" 
                      className="bg-indigo-600 hover:bg-indigo-700 text-white font-black text-[10px] uppercase tracking-widest px-4 h-8"
                    >
                      <Download className="w-3 h-3 mr-2" />
                      Install Now
                    </Button>
                    <button 
                      onClick={handleDismiss}
                      className="text-[10px] font-black text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 uppercase tracking-widest px-2"
                    >
                      Maybe Later
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Progress line at the bottom */}
            <div className="h-1 w-full bg-slate-100 dark:bg-slate-800">
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 10, ease: "linear" }}
                    className="h-full bg-indigo-600"
                />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
