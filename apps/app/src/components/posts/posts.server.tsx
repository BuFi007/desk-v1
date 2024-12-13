import { getPosts } from "@bu/supabase/queries";

export async function PostsServer() {
  const { data } = await getPosts();

  return (
    <div>
      {data?.map((post: any) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}
