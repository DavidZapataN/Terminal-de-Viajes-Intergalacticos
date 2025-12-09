import { api } from '@/lib/axios.config'
import type { Review } from '../types/Review'
import type { CreateReview } from '../types/api/review/CreateReview'
import type { ReviewReply } from '../types/ReviewReply'
import type { CreateReviewReply } from '../types/api/review/CreateReviewReply'

export const likeReview = async (
  reviewId: number
): Promise<{ message: string; likedByUsers: number[] }> => {
  try {
    const response = await api.post<{
      message: string
      likedByUsers: number[]
    }>(`/review/like/${reviewId}`)
    return response.data
  } catch (error) {
    throw new Error('Error liking review')
  }
}

export const unlikeReview = async (
  reviewId: number
): Promise<{ message: string; likedByUsers: number[] }> => {
  try {
    const response = await api.delete<{
      message: string
      likedByUsers: number[]
    }>(`/review/like/${reviewId}`)
    return response.data
  } catch (error) {
    throw new Error('Error unliking review')
  }
}

export const getReviewsByDestinyId = async (
  destinyId: number
): Promise<Review[]> => {
  try {
    const response = await api.get<Review[]>(`/review/destiny/${destinyId}`)
    return response.data
  } catch (error) {
    throw new Error('Error fetching reviews')
  }
}

export const getReviewById = async (id: number): Promise<Review> => {
  try {
    const response = await api.get<Review>(`/review/${id}`)
    return response.data
  } catch (error) {
    throw new Error('Error fetching review')
  }
}

export const createReview = async (
  reviewData: CreateReview
): Promise<Review> => {
  try {
    const response = await api.post<Review>('/review', reviewData)
    return response.data
  } catch (error) {
    throw new Error('Error creating review')
  }
}

export const deleteReview = async (id: number): Promise<void> => {
  try {
    await api.delete(`/review/${id}`)
  } catch (error) {
    throw new Error('Error deleting review')
  }
}

export const getReviewRepliesByReviewId = async (
  reviewId: number
): Promise<ReviewReply[]> => {
  try {
    const response = await api.get<ReviewReply[]>(
      `/review-reply/review/${reviewId}`
    )
    return response.data
  } catch (error) {
    throw new Error('Error fetching review replies')
  }
}

export const createReviewReply = async (
  reviewReplyData: CreateReviewReply
): Promise<ReviewReply> => {
  try {
    const response = await api.post<ReviewReply>(
      '/review-reply',
      reviewReplyData
    )
    return response.data
  } catch (error) {
    throw new Error('Error creating review reply')
  }
}

export const deleteReviewReply = async (id: number): Promise<void> => {
  try {
    await api.delete(`/review-reply/${id}`)
  } catch (error) {
    throw new Error('Error deleting review reply')
  }
}
