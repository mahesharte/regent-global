export type WithPreview = {
  apiVersion: string;
  device: string;
  onChangeDevice: (device: string) => void;
  onLoadIframe: (iframe: HTMLIFrameElement | null) => void;
  previewSecretId: `${string}.${string}`;
};
