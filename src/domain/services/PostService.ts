import { NewPost } from "../entities/Post";
import { PostsRepository } from "../../infrastructure/repositories/PostRepository";

export class PostService {
    private postsRepository: PostsRepository;
    constructor() {
        this.postsRepository = new PostsRepository();
    }

    getPostById(id: string) {
        if (!id || id.trim().length < 1)
            return;
        return this.postsRepository.getPostById(id);
    }

    getAllPosts() {
        return this.postsRepository.getAllPosts();
    }

    async addPost(post: NewPost) {
        if (post?.title?.trim().length < 1 || post?.content?.trim().length < 1)
            return;
        const newPost = await this.postsRepository.savePosts(post);
        return newPost[0].id;
    }

    getPostIdByTitle(title: string) {
        if (!title ||title.trim().length < 3)
            return;
        return this.postsRepository.getPostIdByTitle(title);
    }

}