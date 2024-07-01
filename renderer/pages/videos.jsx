'use client';
import React from 'react';
import axios from 'axios';
import Link from 'next/link'
import Loading from '../components/Loading';
import VideoList from '../components/VideoList';

const VideosRecommendPage = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const [hasRAG, setHasRAG] = React.useState(true);
  const [videos, setVideos] = React.useState([]);

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const apiUrl = "http://103.213.161.39:8000/mix/aisearch"


  const queryObj = {
    "db_key":"znd_v2",
      "top_k": 4, 
      "vector_weight": 0.2,
      "keyword_weight": 0.8,
      "keyword_fields": [
        "video_name",
        "video_sub",
        "video_keywords",
        "video_knowledgePoints"
      ]

  }
  const handleSubmit = async () => {
    setIsLoading(true);
    setIsButtonDisabled(true);
    setHasRAG(true);
    setVideos([]);

    axios.post(apiUrl, Object.assign({},
      { 
      "query": query,     
      },queryObj)) 
      .then((res) => {
        if (res.status === 201) {
          setHasRAG(false);
          setVideos([]);
        } else {
          setHasRAG(true);
          setVideos(res.data.results);
        }
      })
      .catch((err) => {
        console.log('err', err);
      })
      .finally(() => {
        setIsLoading(false);
        setIsButtonDisabled(false);
      });
  };

  return (
    <>
      <Link href='/home' className="btn btn-outline btn-primary text-xl m-2">
        返回首页
      </Link>
      <div className="flex justify-center items-center">
        <div className="w-2/3 p-8 rounded-lg shadow-lg">
          <div><h1 className='font-bold text-xl text-center m-8'>同上一堂课 小学 四五六年级 语数英重难点 <br />视频课程 智能推荐</h1></div>
          <div className="mb-4">
            <textarea
              className="textarea textarea-bordered w-full h-24 text-xl"
              placeholder="输入困惑 ..."
              value={query}
              name="query"
              onChange={handleQueryChange}
            />
          </div>
          <div className="mb-4 flex justify-center">
            <button
              className="btn w-full text-2xl text-pretty btn-primary"
              disabled={isButtonDisabled}
              onClick={handleSubmit}
            >
              {isLoading ? '稍等，AI计算中...' : '给我推荐'}
            </button>
          </div>
          <div className="flex justify-center">
            {isLoading ? (
              <Loading />
            ) : !hasRAG && (
              <div className="w-full text-xl text-yellow-600">对不起，问题超出我的知识范围，没有找到相关视频。<br />请再详细点询问，或问其他问题。</div>
            )}
          </div>
        </div>
      </div>
      <div className="divider"></div>
      {videos.length > 0 && <VideoList videos={videos} />}
    </>
  );
};

export default VideosRecommendPage;
