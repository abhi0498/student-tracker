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
            appId: "84e2e6fc-63e2-4144-bc74-35250ac51bb1",
            allowLocalhostAsSecureOrigin: true,
            notifyButton: {
              enable: true,
              size: "large",
            },
          });
          //   OneSignal.login(id);
          try {
            OneSignal.User.removeAlias("external_id");
          } catch (e) {
            console.error("OneSignal removeAlias", e);
          }

          OneSignal.User.addAlias("external_id", id);
          OneSignal.login(id);
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
