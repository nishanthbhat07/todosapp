import { MMKVLoader } from "react-native-mmkv-storage";

const MMKV = new MMKVLoader().withInstanceID("TODOS").initialize();

export default MMKV;
