import React from 'react'
import PostCard from './postCard/postCard';
import BlogHeader from './blogHeader/blogHeader';
import postCardImage from '../constants/postCardImage/postCardImage1.jpg'
import { useSelector } from 'react-redux';
const Main = () => {
  const {articles} = useSelector((state) => state.article);
  const posts = [
    {
      id: 1,
      author: 'Olivia Rhye',
      date: '1 Jan 2023',
      title: 'UX review presentations',
      description: 'How do you create compelling presentations that wow your colleagues and impress your managers?',
      image: postCardImage,
      tags: ['Design', 'Research', 'Presentation']
    },
    {
      id: 2,
      author: 'Phoenix Baker',
      date: '1 Jan 2023',
      title: 'Migrating to Linear 101',
      description: 'Linear helps streamline software projects, sprints, tasks, and bug tracking. Heres how to get started.',
      image: postCardImage,
      tags: ['Design', 'Research']
    },
    {
      id: 3,
      author: 'Lena Steiner',
      date: '1 Jan 2023',
      title: 'Building your API Stack',
      description: 'The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing them.',
      image: postCardImage,
      tags: ['Design', 'Research']
    },
    {
      id: 4,
      author: 'Olivia Rhye',
      date: '1 Jan 2023',
      title: 'Grid system for better Design User Interface',
      description: 'A grid system is a design tool used to arrange content on a webpage. It is a series of vertical and horizontal lines that create a matrix of intersecting points.',
      image: postCardImage,
      tags: ['Design', 'Interface']
    }
  ];


  // const allPosts = [
  //   {
  //     id: 1,
  //     author: 'Olivia Rhye',
  //     date: '1 Jan 2023',
  //     title: 'UX review presentations',
  //     description: 'How do you create compelling presentations that wow your colleagues and impress your managers?',
  //     image: postCardImage,
  //     tags: ['Design', 'Research', 'Presentation']
  //   },
  //   {
  //     id: 2,
  //     author: 'Phoenix Baker',
  //     date: '1 Jan 2023',
  //     title: 'Migrating to Linear 101',
  //     description: 'Linear helps streamline software projects, sprints, tasks, and bug tracking. Heres how to get started.',
  //     image: postCardImage,
  //     tags: ['Design', 'Research']
  //   },
  //   {
  //     id: 3,
  //     author: 'Lena Steiner',
  //     date: '1 Jan 2023',
  //     title: 'Building your API Stack',
  //     description: 'The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing them.',
  //     image: postCardImage,
  //     tags: ['Design', 'Research']
  //   },
  //   {
  //     id: 4,
  //     author: 'Olivia Rhye',
  //     date: '1 Jan 2023',
  //     title: 'Grid system for better Design User Interface',
  //     description: 'A grid system is a design tool used to arrange content on a webpage. It is a series of vertical and horizontal lines that create a matrix of intersecting points.',
  //     image: postCardImage,
  //     tags: ['Design', 'Interface']
  //   },
  //   {
  //     id: 5,
  //     author: 'Emily Johnson',
  //     date: '2 Jan 2023',
  //     title: 'Mobile UI design principles',
  //     description: 'Learn the fundamentals of creating user-friendly mobile interfaces that users will love.',
  //     image: postCardImage,
  //     tags: ['Design', 'Mobile', 'UI']
  //   },
  //   {
  //     id: 6,
  //     author: 'David Wilson',
  //     date: '3 Jan 2023',
  //     title: 'Frontend frameworks comparison',
  //     description: 'Detailed analysis of popular frontend frameworks and how to choose the right one for your project.',
  //     image: postCardImage,
  //     tags: ['Development', 'Frontend']
  //   }
  // ];


  return (
    <div className="main-container">
      <BlogHeader/>
      <div className="blog-container">
        {/* Recent Posts */}
        <section className="recent-posts">
          <h2 className="section-title">Recent blog posts</h2>
          
          <div className="recent-posts-grid">
            <div className="main-post">
              <PostCard post={posts[0]} size="large" hasArrow={true} />
            </div>
            
            <div className="secondary-posts">
              {posts.slice(1, 3).map(post => (
                <PostCard key={post.id} post={post} size="small" hasArrow={true} />
              ))}
            </div>
          </div>
        </section>

        {/* Grid Design Post */}
        <section className="grid-design-post">
          <PostCard post={posts[3]} size="large" hasArrow={true} />
        </section>
        {/* All Posts */}
        <section className="all-posts-section">
          <h2 className="section-title">All blog posts</h2>
          <div className="all-posts-grid">
            {articles.map(post => (
              <PostCard key={post.id} post={post} size="medium" hasArrow={true} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Main