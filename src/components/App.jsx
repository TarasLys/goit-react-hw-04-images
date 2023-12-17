import { useState, useEffect, useCallback } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { fetchPosts } from './services/api';
import { Loader } from './Loader/Loader';
import Searchbar from './Searchbar/Searchbar';
import Modal from './Modal/Modal';
import Notiflix from 'notiflix';


export const App = () => {
  const per_page = 12;
  const [per, setPer] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchPost, setSearchPost] = useState(null);
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  const [modal, setModal] = useState({
    isOpen: false,
    data: null,
  });

  const onChangeQuery = query => {
    setSearchPost(query);
    setPer([]);
    setPage(1);
    setError(null);
  };

  const fetchAllPosts = useCallback(async () => {
    try {
      setIsLoading(true);
      const post = await fetchPosts(searchPost, page);

      setPer(prevPer => [...prevPer, ...post.images]);
      setLoadMore(page < Math.ceil(post.total / per_page));

      if (post.total === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.',
          { position: 'center-center' }
        );
        return;
      }
    } catch (error) {
      this.setState({ error: error.message });
      Notiflix.Notify.failure(
        'Double warning!!! There is no base... Work on the line :)',
        { position: 'center-center' }
      );
    } finally {
      setIsLoading(false);
    }
  }, [searchPost, page, per_page]);

  useEffect(() => {
    if (searchPost) {
      fetchAllPosts();
    }
  }, [searchPost, fetchAllPosts]);

  const onOpenModal = modalData => {
    setModal({
      isOpen: true,
      data: modalData,
    });
  };

  const onCloseModal = () => {
    setModal({
      isOpen: false,
      data: null,
    });
  };

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: '16px',
        paddingBottom: '24px',
      }}
    >
      {<Searchbar onSubmit={onChangeQuery} />}
      {isLoading && <Loader />}
      {error && <p className="error">{error}</p>}
      {<ImageGallery images={per} onOpenModal={onOpenModal} />}
      {modal.isOpen && <Modal onCloseModal={onCloseModal} data={modal.data} />}
      {loadMore && <Button onClick={onLoadMore} />}
    </div>
  );
};
