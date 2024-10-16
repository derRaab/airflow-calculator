import { MaterialDesign3ColorScheme } from "@/src/themes/m3/MaterialDesign3ColorTheme";
import { delayAsync } from "@/src/utils/promiseUtils";
import * as FileSystem from "expo-file-system";
import { Image } from "expo-image";
import * as MediaLibrary from "expo-media-library";
import { FC, useEffect, useRef, useState } from "react";
import { Platform, ScaledSize, useWindowDimensions, View } from "react-native";
import ViewShot, { captureRef } from "react-native-view-shot";
import { ThreeObject, ThreeObjectProps } from "./ThreeObject";

const TASK_CHECK_FILE_EXISTENCE = "checkFileExistence";
const TASK_CREATE_FILE = "createFile";
const TASK_SHOW_FILE = "showFile";

// Images loaded from the FileSystem.cacheDirectory results invisible images on iOS.
const cacheDirectory =
  Platform.OS === "ios"
    ? FileSystem.documentDirectory + "cache/three-object-cache/"
    : FileSystem.cacheDirectory + "three-object-cache/";

const deleteCacheDirectory = async () => {
  console.log("deleteCacheDirectory() : ", cacheDirectory);
  FileSystem.deleteAsync(cacheDirectory, { idempotent: true });
};
deleteCacheDirectory();
const makeCacheDirectory = async () => {
  console.log("makeCacheDirectory() : ", cacheDirectory);
  FileSystem.makeDirectoryAsync(cacheDirectory, { intermediates: true });
};

const getCacheImageUri = (
  object: string,
  windowSize: ScaledSize,
  colorScheme: MaterialDesign3ColorScheme,
) => {
  const color = colorScheme.primary;
  const size = Math.round(Math.max(windowSize.width, windowSize.height));
  const cacheImageName = `three-object-${object}-${color}-${size}.png`.replace(
    "#",
    "",
  );
  const cacheUri = `${cacheDirectory}${cacheImageName}`;
  return cacheUri;
};

export const ThreeObjectCached: FC<ThreeObjectProps> = ({
  colorScheme,
  object,
  onFirstFrame,
}) => {
  // Internal task management starts with checking file existence
  const [currentTask, setCurrentTask] = useState(TASK_CHECK_FILE_EXISTENCE);
  // Reference to the ViewShot component
  const viewShotRef = useRef<ViewShot | null>(null);
  // Cache URI for the image
  const cacheUri = getCacheImageUri(object, useWindowDimensions(), colorScheme);

  // Check file existence
  const [existingCacheUri, setExistingCacheUri] = useState("");
  useEffect(() => {
    if (currentTask !== TASK_CHECK_FILE_EXISTENCE) {
      return;
    }
    const checkFileExistence = async () => {
      try {
        const cacheUriInCheck = cacheUri;
        console.log("Checking file existence", cacheUri);
        const fileInfo = await FileSystem.getInfoAsync(cacheUri);
        console.log("fileInfo", fileInfo);
        if (fileInfo.exists) {
          setExistingCacheUri(cacheUriInCheck);
          setCurrentTask(TASK_SHOW_FILE);
        } else {
          setCurrentTask(TASK_CREATE_FILE);
        }
      } catch (error) {
        console.log("Error checking file existence", error);
        setCurrentTask(TASK_CREATE_FILE);
      }
    };
    checkFileExistence();
  }, [cacheUri, currentTask]);

  const invokeOnFirstFrame = () => {
    if (onFirstFrame) {
      onFirstFrame();
    }
  };

  const creatingCacheFileRef = useRef(false);

  const createCacheFile = async () => {
    if (currentTask !== TASK_CREATE_FILE || creatingCacheFileRef.current) {
      return;
    }
    /*const current = viewShotRef.current as ViewShot;
    if (!current.capture) {
      setCurrentTask(TASK_SHOW_FILE);
      return;
    }*/

    creatingCacheFileRef.current = true;

    const delay = 1000;

    try {
      if (delay) await delayAsync(delay);
      const uri = await captureRef(viewShotRef);
      if (delay) await delayAsync(delay);
      await makeCacheDirectory();
      if (delay) await delayAsync(delay);
      await FileSystem.copyAsync({ from: uri, to: cacheUri });
      console.log("Created the cache file", cacheUri);
      if (delay) await delayAsync(delay);
      await MediaLibrary.saveToLibraryAsync(cacheUri);
      console.log("Added saved image to library as well");
      if (delay) await delayAsync(delay);
      setExistingCacheUri(cacheUri);
    } catch (error) {
      console.log("Error creating the cache file", error);
    } finally {
      creatingCacheFileRef.current = false;
      setCurrentTask(TASK_SHOW_FILE);
    }
  };

  const onThreeObjectFirstFrame = async () => {
    //invokeOnFirstFrame();
    createCacheFile();
  };

  if (currentTask === TASK_CHECK_FILE_EXISTENCE) {
    return null;
  }

  if (currentTask === TASK_SHOW_FILE) {
    invokeOnFirstFrame();

    return (
      <View style={{ width: 300, height: 300 }}>
        <Image
          style={{ width: 300, height: 300 }}
          onError={(e) => {
            console.log("Cached image onError", e);
          }}
          onLoad={(e) => {
            console.log("Cached image onLoad:", e);
          }}
          source={{ uri: existingCacheUri }}
          contentFit="cover"
          cachePolicy={"disk"}
        />
      </View>
    );
  }

  return (
    <ViewShot ref={viewShotRef}>
      <View>
        <ThreeObject
          colorScheme={colorScheme}
          object={object}
          onFirstFrame={onThreeObjectFirstFrame}
        />
      </View>
    </ViewShot>
  );
};
