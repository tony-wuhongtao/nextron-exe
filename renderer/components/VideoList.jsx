import { Player,BigPlayButton,ReplayControl,ForwardControl,ControlBar,LoadingSpinner  } from 'video-react';
import "video-react/dist/video-react.css"; 

const VideoList = ({videos}) => {
  return (
    <div className="flex justify-center items-center my-4 md:flex-auto">

    {
        videos.map((video)=>(
            <div key={video.id} className="card w-96 bg-base-100 shadow-xl m-8">
                <figure>
                    <Player
                            startTime = {13}
                            preload="auto"
                            poster={video.cover_link}
                            src={video.link}
                        >
                    <BigPlayButton position="center" />
                    <LoadingSpinner />
                    <ControlBar autoHide={true}>
                        <ReplayControl seconds={10} order={2.1} />
                        <ForwardControl seconds={10} order={2.2} />
                    </ControlBar>
                    </Player>
                </figure>
                <div className="card-body">
                    <h1 className="card-title">{video.name}</h1>
                    <h2 className='card-title'>{video.teacher}</h2>
                    <div className="divider"></div>
                    <p><b>知识点</b>{video.knowledgePoints}</p>
                    <p><b>关键字</b>{video.keywords}</p>
                    <div className="divider"></div>
                    <p><b>课程介绍：</b>{video.simpleSummary}</p>
                
                </div>
            </div>

        ))

    }
</div>
  )
}

export default VideoList
