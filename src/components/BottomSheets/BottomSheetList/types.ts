import { BottomSheetModalProps } from "@gorhom/bottom-sheet";
import { BottomSheetFlatListProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetScrollable/types";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { ReactNode } from "react";
import { PressableStateCallbackType, ViewStyle } from "react-native";
import { StyleProp } from "react-native";

type IBottomSheetProps = BottomSheetModalProps & React.RefAttributes<BottomSheetModalMethods>;

interface IBottomSheetListProps<T> extends IBottomSheetProps {
  children: ReactNode;
  index?: number;
  snapPoints: Array<string | number>;
  enableBackdropInteractions: boolean;
  indicatorStyle: StyleProp<ViewStyle>;
  backDropStyle:
    | StyleProp<ViewStyle>
    | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>);
  flatListProps: BottomSheetFlatListProps<T>;
  onOpen(): void;
  onClose(): void;
}

export { IBottomSheetListProps };
