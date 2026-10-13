import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, StyleProp, ImageStyle, ViewStyle, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getSafeImageUrl } from '../utils/imageUrl';

interface Props {
  uri: string;
  style?: StyleProp<ImageStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  resizeMode?: 'cover' | 'contain' | 'stretch';
  title?: string;
  artist?: string;
  targetWidth?: number;
}

export const MasterpieceImage: React.FC<Props> = ({
  uri,
  style,
  containerStyle,
  resizeMode = 'cover',
  title,
  artist,
  targetWidth
}) => {
  const [loadError, setLoadError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [useBackup, setUseBackup] = useState(false);

  // 1차: wsrv.nl Cloudflare 캐시 URL (안드로이드 OkHttp 403 차단 우회)
  // 2차: 원본 URL
  const activeUri = useBackup ? uri : getSafeImageUrl(uri, targetWidth);

  const handleError = () => {
    if (!useBackup) {
      setUseBackup(true); // 1회 백업 시도
    } else {
      setLoadError(true);
      setIsLoading(false);
    }
  };

  if (loadError) {
    return (
      <View style={[styles.fallbackContainer, containerStyle, style as any]}>
        <View style={styles.fallbackFrame}>
          <Ionicons name="color-palette-outline" size={28} color="#d4af37" />
          {title && (
            <Text style={styles.fallbackTitle} numberOfLines={2}>
              {title}
            </Text>
          )}
          {artist && (
            <Text style={styles.fallbackArtist} numberOfLines={1}>
              {artist}
            </Text>
          )}
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.wrapper, containerStyle]}>
      <Image
        source={{
          uri: activeUri,
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36'
          }
        }}
        style={style}
        resizeMode={resizeMode}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
        onError={handleError}
      />
      {isLoading && (
        <View style={[StyleSheet.absoluteFill, styles.loadingPlaceholder]}>
          <ActivityIndicator size="small" color="#d4af37" />
          {title && (
            <Text style={styles.loadingTitle} numberOfLines={1}>
              {title}
            </Text>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    overflow: 'hidden'
  },
  loadingPlaceholder: {
    backgroundColor: '#0a0d14',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6
  },
  loadingTitle: {
    marginTop: 4,
    color: '#d4af37',
    fontSize: 10,
    fontWeight: '600',
    textAlign: 'center'
  },
  fallbackContainer: {
    backgroundColor: '#111622',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)'
  },
  fallbackFrame: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  fallbackTitle: {
    color: '#f5d76e',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 6
  },
  fallbackArtist: {
    color: '#94a3b8',
    fontSize: 10,
    marginTop: 2,
    textAlign: 'center'
  }
});
