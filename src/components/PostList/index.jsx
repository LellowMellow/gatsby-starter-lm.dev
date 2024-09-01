import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import PostCard from "./PostCard"
import TabBar from "./TabBar"
import PostBlock from "./PostBlock"

const Title = styled.h2`
  flex: 0 1 auto;
  margin-top: 4rem;
  margin-bottom: 0.25rem;
  padding: 0.25rem 0.125rem;
  font-weight: 600;
  font-size: 1.875rem;
  color: ${props => props.theme.text};
  line-height: 1.3;
`

const GridWrapper = styled.div`
  margin-top: 1rem;
  margin-bottom: 0.25rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(16.25rem, 1fr));
  gap: 1rem;
`

const ListWrapper = styled.div`
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
  display: flex;
  flex-direction: column;
`

const PostList = ({ postInfo, isSeries = false }) => {
  const [isGridView, setIsGridView] = useState(!isSeries && true)
  const [visiblePosts, setVisiblePosts] = useState(10)
  const [postsProps, setPostsProps] = useState([])
  const observerRef = useRef(null)

  const handleIntersection = entries => {
    if (entries[0].isIntersecting) {
      setVisiblePosts(prevCount => Math.min(prevCount + 10, postInfo.length))
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "0px",
      threshold: 1,
    })

    if (observerRef.current) observer.observe(observerRef.current)
    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current)
    }
  }, [postInfo.length])

  useEffect(() => {
    const updatedPostsProps = postInfo.slice(0, visiblePosts).map(item => {
      if (isSeries)
        return {
          key: item.fieldValue,
          title: item.fieldValue,
          post: item.totalCount,
        }
      else
        return {
          key: item.node.id,
          to: item.node.fields.slug,
          title: item.node.frontmatter.title,
          date: new Date(item.node.frontmatter.date).toLocaleDateString(),
          icon: item.node.frontmatter.icon,
          tags: item.node.frontmatter.tags,
          detail: item.node.excerpt,
        }
    })
    setPostsProps(updatedPostsProps)
  }, [visiblePosts, postInfo])

  return (
    <>
      <Title>{isSeries ? "All Series" : "All Posts"}</Title>
      <TabBar
        isGridView={isGridView}
        isSeries={isSeries}
        changeToGrid={() => setIsGridView(true)}
        changeToList={() => setIsGridView(false)}
      />
      {isGridView ? (
        <GridWrapper>
          {postsProps.map(props => (
            <PostCard {...props} />
          ))}
        </GridWrapper>
      ) : (
        <ListWrapper>
          {postsProps.map(props => (
            <PostBlock {...props} />
          ))}
        </ListWrapper>
      )}
      {visiblePosts < postInfo.length && (
        <div
          ref={observerRef}
          style={{ height: "1rem", marginBottom: "10rem" }}
        />
      )}
    </>
  )
}

export default PostList
