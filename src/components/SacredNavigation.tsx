
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useSacredAuth } from '@/hooks/useSacredAuth';
import { LogOut, Crown, Moon, Leaf, Brain, Heart, Users } from 'lucide-react';

const identityIcons = {
  civic: Crown,
  ancestral: Moon,
  ecological: Leaf,
  digital: Brain,
  spiritual: Heart,
  proxy: Users
};

const SacredNavigation = () => {
  const { user, activeRitualSession, sacredIdentities, signOut } = useSacredAuth();
  
  const activeIdentity = sacredIdentities.find(identity => 
    identity.id === activeRitualSession?.identity_id
  );

  return (
    <div className="flex items-center space-x-4">
      {activeRitualSession && activeIdentity && (
        <div className="flex items-center space-x-2">
          {(() => {
            const Icon = identityIcons[activeIdentity.identity_type as keyof typeof identityIcons];
            return <Icon className="w-4 h-4 text-purple-400" />;
          })()}
          <span className="text-sm text-gray-300">
            Sacred Session: <span className="text-white font-medium">{activeIdentity.identity_name}</span>
          </span>
          <Badge variant="secondary" className="bg-purple-500/20 text-purple-400">
            {activeRitualSession.ritual_type}
          </Badge>
        </div>
      )}
      
      {user && (
        <Button
          variant="outline"
          size="sm"
          onClick={signOut}
          className="border-white/20 text-white hover:bg-white/10"
        >
          <LogOut className="w-4 h-4 mr-2" />
          End Sacred Session
        </Button>
      )}
    </div>
  );
};

export default SacredNavigation;
