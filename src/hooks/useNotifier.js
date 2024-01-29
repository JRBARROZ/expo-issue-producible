import { useCallback, useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";

function useNotifier() {
  const { setNotifierStates } = useContext(GlobalContext);

  const openNotification = useCallback((config) => {
    setNotifierStates(config);
  }, []);

  const closeNofication = useCallback(() => {
    setNotifierStates(null);
  }, []);

  return { openNotification, closeNofication };
}

export default useNotifier;
