
import { Audio } from 'expo-av';

class SoundService {
    constructor() {
        this.sound = null;
        this.isPlaying = false;
        this.init();
    }

    async init() {
        try {
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: false,
                playsInSilentModeIOS: true,
                staysActiveInBackground: true,
                shouldDuckAndroid: true,
                playThroughEarpieceAndroid: false,
            });
        } catch (e) {
            console.error("SoundService: Error initializing audio mode", e);
        }
    }

    async loadSound(uri) {
        if (!uri) {
            console.error("SoundService: No URI provided");
            return false;
        }
        console.log("SoundService: Attempting to load sound", uri);

        if (this.sound) {
            console.log("SoundService: Unloading previous sound");
            await this.sound.unloadAsync();
        }

        try {
            const { sound, status } = await Audio.Sound.createAsync(
                { uri },
                { shouldPlay: true }
            );
            this.sound = sound;
            this.isPlaying = true;
            console.log("SoundService: Sound loaded successfully", status);

            
            this.sound.setOnPlaybackStatusUpdate(this._onPlaybackStatusUpdate);

            return true;
        } catch (error) {
            console.error("SoundService: Error loading sound", error);
            return false;
        }
    }

    setOnPlaybackStatusUpdate(callback) {
        this.onPlaybackStatusUpdate = callback;
    }

    _onPlaybackStatusUpdate = (status) => {
        if (status.error) {
            console.error(`SoundService: Playback error: ${status.error}`);
        }
        if (status.didJustFinish) {
            console.log("SoundService: Playback finished");
            this.isPlaying = false;
        }
        if (this.onPlaybackStatusUpdate) {
            this.onPlaybackStatusUpdate(status);
        }
    }

    async playSound() {
        if (this.sound) {
            try {
                console.log("SoundService: Playing sound");
                await this.sound.playAsync();
                this.isPlaying = true;
            } catch (error) {
                console.error("SoundService: Error playing sound", error);
            }
        } else {
            console.log("SoundService: No sound loaded to play");
        }
    }

    async pauseSound() {
        if (this.sound) {
            try {
                console.log("SoundService: Pausing sound");
                await this.sound.pauseAsync();
                this.isPlaying = false;
            } catch (error) {
                console.error("SoundService: Error pausing sound", error);
            }
        }
    }

    async seekTo(positionMillis) {
        if (this.sound) {
            try {
                await this.sound.setPositionAsync(positionMillis);
            } catch (error) {
                console.error("SoundService: Error seeking", error);
            }
        }
    }

    async unloadSound() {
        if (this.sound) {
            try {
                console.log("SoundService: Unloading sound");
                await this.sound.unloadAsync();
                this.sound = null;
                this.isPlaying = false;
            } catch (error) {
                console.error("SoundService: Error unloading sound", error);
            }
        }
    }

    async getStatus() {
        if (this.sound) {
            return await this.sound.getStatusAsync();
        }
        return null;
    }

    get isLoaded() {
        return !!this.sound;
    }
}

export default new SoundService();
