import { RootState } from "@/store";
import {
  TypedUseSelectorHook,
  useSelector as useReduxSelector,
} from "react-redux";

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

export default useSelector;
