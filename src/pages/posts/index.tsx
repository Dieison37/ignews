/* eslint-disable react/jsx-key */
import { GetStaticProps } from 'next';
import  Head  from 'next/head';
import Prismic from '@prismicio/client'
import { RichText } from 'prismic-dom'
import Link from 'next/link';

import { getPrismicClient } from '../../services/prismic';
import styles from './styles.module.scss';

type Post ={
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;
};

interface PostsProps {
  posts: Post[]
  
}
export default function Posts({ posts }: PostsProps) {
  return (
   <>
   <Head>
    <title>Posts | Ignews</title>
   </Head>

   <main className={styles.container}>
    <div className={styles.posts}>
      { posts.map(post => (
        <Link href={`/posts/${post.slug}`}>
       <a key={post.slug}>
       <time>{post.updatedAt}</time>
       <strong>{post.title}</strong>
        <p>{post.excerpt}</p>
       </a>
     </Link>
      ))}
    </div>
   </main>
   </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient()

  const response = await prismic.query([
    Prismic.predicates.at('document.type', 'posts')
  ], {
    
    fetch: ['post.title', 'post.content'], 
    pageSize: 100,
  })
  
  const posts = response.results.map(post => {
    return { 
      slug: post.uid,
      title: RichText.asText(post.data.title),
      excerpt: post.data.content.find(content => content.type === 'paragraph')?.text ?? '',
      updateAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    };
  });
  
  return { 
    props: {
      posts
    }
  }
  
}