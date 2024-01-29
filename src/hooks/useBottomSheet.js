import { useCallback, useRef } from "react";

export default function useBottomSheet() {
  const ref = useRef(null);

  const handleOpen = useCallback(() => {
    if (ref.current) {
      setTimeout(() => ref.current.present(), 0);
    }
  }, []);

  const handleClose = useCallback(() => {
    if (ref.current) {
      const reference = ref.current;
      setTimeout(() => reference.dismiss(), 0);
    }
  }, []);

  return [ref, handleOpen, handleClose];
}
