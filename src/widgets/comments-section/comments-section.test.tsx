import { useComments, useAddComment } from '@headless-comments/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Mock } from 'vitest';
import { CommentsSection } from './comments-section';
import '@testing-library/jest-dom';

vi.mock('@headless-comments/react', () => ({
  useComments: vi.fn(),
  useAddComment: vi.fn(),
}));

const mockUseComments = useComments as Mock;
const mockUseAddComment = useAddComment as Mock;

describe('<CommentsSection />', () => {
  beforeEach(() => {
    mockUseComments.mockReturnValue({
      comments: [],
    });
    mockUseAddComment.mockReturnValue({});
  });

  afterEach(() => {
    mockUseComments.mockReset();
    mockUseAddComment.mockReset();
  });

  it('displays comments when comments load successfully', () => {
    mockUseComments.mockReturnValue({
      comments: [
        { id: '1', text: 'comment 1', createdAt: new Date(2000, 0, 1) },
        { id: '2', text: 'comment 2', createdAt: new Date(2000, 0, 2) },
      ],
    });

    render(<CommentsSection />);

    expect(screen.getByText('comment 1')).toBeInTheDocument();
    expect(screen.getByText('comment 2')).toBeInTheDocument();
  });

  it('displays fallback text when no comments have been added', () => {
    mockUseComments.mockReturnValue({
      comments: [],
    });

    render(<CommentsSection />);

    expect(screen.getByText('Be the first to comment.')).toBeInTheDocument();
  });

  it('displays comments error when comments fail to load', () => {
    mockUseComments.mockReturnValue({
      comments: [],
      error: true,
    });

    render(<CommentsSection />);

    expect(screen.getByText('Failed to load comments.')).toBeInTheDocument();
  });

  it('displays comments loading prompt when comments are loading', () => {
    mockUseComments.mockReturnValue({
      comments: [],
      loading: true,
    });

    render(<CommentsSection />);

    expect(screen.getByText('Loading comments...')).toBeInTheDocument();
  });

  it('adds comments when add comment submit succeeds', async () => {
    const mockAddComment = vi.fn();
    mockUseAddComment.mockReturnValue({
      addComment: mockAddComment,
    });

    render(<CommentsSection />);

    const contentInput = screen.getByLabelText('Add a Comment');
    await userEvent.type(contentInput, 'hello world!');

    const submitButton = screen.getByText<HTMLButtonElement>('Publish');
    await userEvent.click(submitButton);

    expect(mockAddComment).toBeCalledWith({ text: 'hello world!' });
  });

  it('displays add comment error when adding comment fails', () => {
    mockUseAddComment.mockReturnValue({
      error: true,
    });

    render(<CommentsSection />);

    expect(screen.getByText('Failed to add comment.')).toBeInTheDocument();
  });

  it('displays add comment loading prompt on disabled submit button when adding comment', () => {
    mockUseAddComment.mockReturnValue({
      loading: true,
    });

    render(<CommentsSection />);

    const submitButton = screen.getByText<HTMLButtonElement>('Publishing...');
    expect(submitButton).toBeInTheDocument();
    expect(submitButton.disabled).toBeTruthy();
  });
});
