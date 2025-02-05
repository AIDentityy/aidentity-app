export interface Tweet {
  id: string;
  text: string;
  created_at: string;
  html: string;
  name: string;
  username: string;
  permanentUrl: string;
  public_metrics?: {
    retweet_count: number;
    reply_count: number;
    like_count: number;
    quote_count: number;
  };
}
