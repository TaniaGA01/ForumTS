export interface ForumI {
    categories: CategoryI[];
    forums:     ForumElementI[];
    posts:      PostI[];
    stats:      StatsI;
    threads:    ThreadI[];
    users:      UserI[];
}

export interface CategoryI {
    forums: string[];
    name:   string;
    slug:   string;
    id:     string;
}

export interface ForumElementI {
    categoryId:  string;
    description: string;
    lastPostId?: string;
    name:        string;
    slug:        string;
    threads?:    string[];
    id:          string;
}

export interface PostI {
    edited?:     EditedI;
    publishedAt: number;
    text:        string;
    threadId:    string;
    userId:      string;
    id:          string;
    reactions?:  ReactionsI;
}

export interface EditedI {
    at:        number;
    by:        string;
    moderated: boolean;
}

export interface ReactionsI {
    "❤️"?:           EmptyI;
    "\ud83d\udc4e"?: ReactionsClassI;
    "\ud83d\udc4d"?: ClassI;
    "\ud83d\udca9"?: PurpleI;
    "\ud83d\ude04"?: FluffyI;
}

export interface EmptyI {
    Miej9zSGMRZKDvMXzfxjVOyv3RF3?:   string;
    "7uVPJS9GHoftN58Z2MXCYDqmNAh2"?: string;
    jUjmgCurRRdzayqbRMO7aTG9X1G2?:   string;
}

export interface ClassI {
    NnooaWj4KHVxbhKwO1pEdfaQDsD2?: string;
    f5xvKdIPQdSrUtT6i3UiHYttRXO2?: string;
    Miej9zSGMRZKDvMXzfxjVOyv3RF3?: string;
}

export interface ReactionsClassI {
    Miej9zSGMRZKDvMXzfxjVOyv3RF3?: string;
    VXjpr2WHa8Ux4Bnggym8QFLdv5C3?: string;
}

export interface PurpleI {
    NnooaWj4KHVxbhKwO1pEdfaQDsD2: string;
}

export interface FluffyI {
    jUjmgCurRRdzayqbRMO7aTG9X1G2: string;
}

export interface StatsI {
    postsCount:   number;
    threadsCount: number;
    usersCount:   number;
    usersOnline:  number;
}

export interface ThreadI {
    contributors?: string[];
    firstPostId:   string;
    forumId:       string;
    lastPostAt:    number;
    lastPostId:    string;
    posts:         string[];
    publishedAt:   number;
    slug:          string;
    title:         string;
    userId:        string;
    id:            string;
}

export interface UserI {
    avatar:        string;
    email:         string;
    lastVisitAt:   number;
    name:          string;
    isModerator?:  boolean;
    registeredAt:  number;
    username:      string;
    usernameLower: string;
    id:            string;
    bio?:          string;
    twitter?:      string;
    website?:      string;
}
