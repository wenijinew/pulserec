import { View, Text } from "react-native";

export default function Home() {
  return (
    <View className="flex-1 items-center justify-center bg-black">
      <Text className="text-4xl font-bold text-white">PulseRec</Text>
      <Text className="mt-4 text-lg text-neutral-400">Track your sports stats. Share your pulse.</Text>
    </View>
  );
}
