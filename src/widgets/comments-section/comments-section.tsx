import { useAddComment, useComments } from '@headless-comments/react';
import { FormEvent, useState } from 'react';

export function CommentsSection() {
  const {
    comments,
    loading: commentsLoading,
    error: commentsError,
  } = useComments();
  const {
    addComment,
    loading: addCommentLoading,
    error: addCommentError,
  } = useAddComment();

  const [addCommentContent, setAddCommentContent] = useState<string>('');

  async function handleAddCommentFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      await addComment({ text: addCommentContent });

      setAddCommentContent('');
    } catch (err) {
      console.error(err);
    }
  }

  if (commentsLoading) {
    return <div>Loading comments...</div>;
  }

  if (commentsError) {
    return <div className="text-red-700">Failed to load comments.</div>;
  }

  return (
    <div>
      <form onSubmit={handleAddCommentFormSubmit}>
        <div className="mt-2">
          <label htmlFor="comment">Add a Comment</label>
          <textarea
            id="comment"
            name="comment"
            className="mt-1 w-full"
            value={addCommentContent}
            onChange={(e) => setAddCommentContent(e.target.value)}
            rows={3}
            required
          />
        </div>
        <button className="btn btn-secondary mt-4" disabled={addCommentLoading}>
          {addCommentLoading ? 'Publishing...' : 'Publish'}
        </button>
        {addCommentError ? (
          <div className="text-red-700">Failed to add comment.</div>
        ) : null}
      </form>
      <div className="mt-4">
        {comments.length ? (
          <div>
            {comments.map(({ id, text, createdAt }) => (
              <article key={id} className="border-t py-4">
                <pre className="font-primary">{text}</pre>
                <span>
                  <time
                    dateTime={createdAt.toISOString()}
                    className="text-xs text-gray-600"
                  >
                    {createdAt.toLocaleString()}
                  </time>
                </span>
              </article>
            ))}
          </div>
        ) : (
          <div>Be the first to comment.</div>
        )}
      </div>
    </div>
  );
}
