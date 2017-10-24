/* @flow */

import type { TelegramUser } from '../bot/TelegramConnector';

import type { Event } from './Event';

type PhotoSize = Array<{
  file_id: string,
  width: number,
  height: number,
}>;

type Audio = {
  file_id: string,
  width: number,
  height: number,
};

type Document = {
  file_id: string,
};

type Sticker = {
  file_id: string,
  width: number,
  height: number,
};

type Video = {
  file_id: string,
  width: number,
  height: number,
  duration: number,
};

type Voice = {
  file_id: string,
  duration: number,
};

type VideoNote = {
  file_id: string,
  length: number,
  duration: number,
};

type Contact = {
  phone_number: string,
  first_name: string,
};

type Location = {|
  longitude: number,
  latitude: number,
|};

type Venue = {
  location: Location,
  title: string,
  address: string,
};

type File = {
  file_id: string,
};

type Message = {
  message_id: number,
  from: TelegramUser,
  chat: {
    id: number,
    first_name: string,
    last_name: string,
    type: 'private',
  },
  date: number,
  text: string,
  entities: Array<{
    type: 'bot_command',
    offset: number,
    length: number,
  }>,
  photo?: PhotoSize,
  audio?: Audio,
  document?: Document,
  sticker?: Sticker,
  video?: Video,
  voice?: Voice,
  video_note?: VideoNote,
  contact?: Contact,
  location?: Location,
  venue?: Venue,
  file?: File,
};

type CallbackQuery = {
  from: TelegramUser,
  message: Message,
  chat_instance: string,
  data: string,
};

export type TelegramRawEvent = {
  update_id: number,
  message?: Message,
  callback_query?: CallbackQuery,
};

export default class TelegramEvent implements Event {
  _rawEvent: TelegramRawEvent;

  constructor(rawEvent: TelegramRawEvent) {
    this._rawEvent = rawEvent;
  }

  /**
   * Underlying raw event from Telegram.
   *
   */
  get rawEvent(): TelegramRawEvent {
    return this._rawEvent;
  }

  /**
   * Determine if the event is a message event.
   *
   */
  get isMessage(): boolean {
    return !!this._rawEvent.message;
  }

  /**
   * The message object from Telegram raw event.
   *
   */
  get message(): ?Message {
    return this._rawEvent.message;
  }

  /**
   * The callback query from Telegram raw event.
   *
   */
  get callbackQuery(): ?CallbackQuery {
    return this._rawEvent.callback_query;
  }

  /**
   * Determine if the event is a message event which includes text.
   *
   */
  get isText(): boolean {
    return this.isMessage && typeof (this.message: any).text === 'string';
  }

  /**
   * Determine if the event is a message event which includes audio.
   *
   */
  get isAudio(): boolean {
    if (!this.isMessage) return false;

    const message: Message = (this.message: any);

    return !!message.audio && typeof message.audio === 'object';
  }

  /**
   * Determine if the event is a message event which includes document.
   *
   */
  get isDocument(): boolean {
    if (!this.isMessage) return false;

    const message: Message = (this.message: any);

    return !!message.document && typeof message.document === 'object';
  }

  /**
   * Determine if the event is a message event which includes game.
   *
   */
  get isGame(): boolean {
    if (!this.isMessage) return false;

    const message: Message = (this.message: any);

    return !!message.game && typeof message.game === 'object';
  }

  /**
   * Determine if the event is a message event which includes photo.
   *
   */
  get isPhoto(): boolean {
    if (!this.isMessage) return false;

    const message: Message = (this.message: any);

    return !!message.photo && message.photo.length > 0;
  }

  /**
   * Determine if the event is a message event which includes sticker.
   *
   */
  get isSticker(): boolean {
    if (!this.isMessage) return false;

    const message: Message = (this.message: any);

    return !!message.sticker && typeof message.sticker === 'object';
  }

  /**
   * Determine if the event is a message event which includes video.
   *
   */
  get isVideo(): boolean {
    if (!this.isMessage) return false;

    const message: Message = (this.message: any);
    return !!message.video && typeof message.video === 'object';
  }

  /**
   * Determine if the event is a message event which includes voice.
   *
   */
  get isVoice(): boolean {
    if (!this.isMessage) return false;

    const message: Message = (this.message: any);

    return !!message.voice && typeof message.voice === 'object';
  }

  /**
   * Determine if the event is a message event which includes video note.
   *
   */
  get isVideoNote(): boolean {
    if (!this.isMessage) return false;

    const message: Message = (this.message: any);

    return !!message.video_note && typeof message.video_note === 'object';
  }

  /**
   * Determine if the event is a message event which includes contact.
   *
   */
  get isContact(): boolean {
    if (!this.isMessage) return false;

    const message: Message = (this.message: any);

    return !!message.contact && typeof message.contact === 'object';
  }

  /**
   * Determine if the event is a message event which includes location.
   *
   */
  get isLocation(): boolean {
    if (!this.isMessage) return false;

    const message: Message = (this.message: any);

    return !!message.location && typeof message.location === 'object';
  }

  /**
   * Determine if the event is a message event which includes venue.
   *
   */
  get isVenue(): boolean {
    if (!this.isMessage) return false;

    const message: Message = (this.message: any);

    return !!message.venue && typeof message.venue === 'object';
  }

  /**
   * Determine if the event is a callback query event.
   *
   */
  get isCallbackQuery(): boolean {
    return !!this.callbackQuery && typeof this.callbackQuery === 'object';
  }
}
