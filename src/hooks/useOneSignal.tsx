import React, { useRef } from "react";
import OneSignal from "react-onesignal";

const useOneSignal = (id: string) => {
  const onesignalInitializingRef = useRef(false);

  React.useEffect(() => {
    if (!id && onesignalInitializingRef.current) {
      OneSignal.logout();
    }
    const init = async () => {
      try {
        if (!onesignalInitializingRef.current) {
          console.log("Initializing OneSignal");
          onesignalInitializingRef.current = true;
          await OneSignal.init({
            appId: "f567c986-15be-4591-93f8-1054dcd29fcd",
            allowLocalhostAsSecureOrigin: true,
            notifyButton: {
              enable: true,
              size: "large",
            },
          });
          OneSignal.login(id);
          OneSignal.User.removeAlias("external_id");
          OneSignal.User.addAlias("external_id", id);
        }
      } catch (e) {
        console.error("OneSignal Initilization", e);
      } finally {
        onesignalInitializingRef.current = false;
      }
    };
    if (id) {
      init();
    }
  }, [id]);
};

export default useOneSignal;
