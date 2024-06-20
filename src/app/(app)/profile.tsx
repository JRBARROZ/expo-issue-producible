import { MainButton } from "@/components/Buttons";
import { useRepository } from "@/config/useRepository";
import { Text, View } from "react-native";

function Profile() {
  const repo = useRepository();
  return (
    <View>
      <Text>Profile screen</Text>
      <MainButton
        onPress={() => {
          repo.postTest();
        }}
      >
        PRESS ME TO BUG SQLITE WITH TYPEORM
      </MainButton>
    </View>
  );
}

export default Profile;
