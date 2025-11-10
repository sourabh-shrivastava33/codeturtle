export interface RepositoriesCreate {
  name: string;
  full_name: string;
  owner_name: string;
  is_private: boolean;
  default_branch: string;
  description: string;
  html_url: string;
  clone_url: string;
  githubId: string;
  encrypted_token: string;
}
