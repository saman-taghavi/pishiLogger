export interface LoginRersponse {
  id: string;
  create_at: number;
  update_at: number;
  delete_at: number;
  username: string;
  auth_data: string;
  auth_service: string;
  email: string;
  nickname: string;
  first_name: string;
  last_name: string;
  position: string;
  roles: string;
  props: Props;
  notify_props: NotifyProps;
  last_password_update: number;
  last_picture_update: number;
  locale: string;
  timezone: Timezone;
  disable_welcome_email: boolean;
}

interface Props {
  customStatus: string;
}

interface NotifyProps {
  channel: string;
  comments: string;
  desktop: string;
  desktop_sound: string;
  desktop_threads: string;
  email: string;
  email_threads: string;
  first_name: string;
  mention_keys: string;
  push: string;
  push_status: string;
  push_threads: string;
}

interface Timezone {
  automaticTimezone: string;
  manualTimezone: string;
  useAutomaticTimezone: string;
}

export type channelResponse = channel[];
interface channel {
  id: string;
  create_at: number;
  update_at: number;
  delete_at: number;
  team_id: string;
  type: string;
  display_name: string;
  name: string;
  header: string;
  purpose: string;
  last_post_at: number;
  total_msg_count: number;
  extra_update_at: number;
  creator_id: string;
  scheme_id?: string;
  props: any;
  group_constrained?: boolean;
  shared?: boolean;
  total_msg_count_root: number;
  policy_id: any;
  last_root_post_at: number;
}
