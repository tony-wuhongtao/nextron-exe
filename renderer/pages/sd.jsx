'use client'
import { useState } from 'react';
import Link from 'next/link'
import Loading from '../components/Loading';
import ModelsSelectorWrapper from '../components/ModelSelectorWrapper';

function createTxt2img(options) {
    return {
        prompt: options.prompt ?? 'a cute cat', // 使用 ?? 运算符设置默认值
        negative_prompt: options.negative_prompt?? '',
        batchSize: options.batchSize ?? 1,
        n_iter: options.n_iter ?? 1,
        steps: options.steps ?? 20,
        cfg_scale: options.cfg_scale ?? 7,
        width: options.width ?? 512,
        height: options.height ?? 512,
        sampler_index: options.sampler_index ?? "Euler a",
        override_settings: options.override_settings
    };
}

export default function Txt2ImagePage() {
  const [enprompt, setEnprompt] = useState('')
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [imgCode, setImgCode] = useState('')
  const [isLoading, setIsLoading] = useState(false);

  const ollama_api_url = "http://103.213.161.39:11434"
  const routePath='/api/generate'
  const aiModel = 'llama3:8b'

  

  const handleSubmit = async (event) => {
    event.preventDefault() // 防止表单提交导致页面刷新
    
    setImgCode('')
    setIsButtonDisabled(true) // 禁用按钮
    setIsLoading(true) // 显示加载状态

    const formData = new FormData(event.currentTarget)
    const cnprompt = formData.get('cnprompt')?.toString() || ''
    let enprompt = formData.get('enprompt')?.toString() || ''
    const sd_model_checkpoint = formData.get('model')?.toString() || ''
 
    // const selectedModel = formData.get('model')
    // console.log(selectedModel)

    console.log(cnprompt)
    

    
    if(cnprompt != '') { //输入了中文，调用翻译api
        try {
            const body = {
                model: aiModel,
                prompt: "Translate : the following Chinese into English, only reply to my translated English text:" + cnprompt,
                // prompt: "Translation: The following Chinese is translated into English, reply to my translation to split the key words in the sentence with commas,directly reply to my translated and divided English text, without any guidance.:" +cnString,
                Stream: false
            }
            
            const res = await fetch(ollama_api_url+routePath, {
                method: 'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(body),
            })
            const data = await res.json()
            
            
            enprompt = data.response
            setEnprompt(enprompt)
            
            // console.log(data)
            
            // 更新 formData，将 enprompt 添加到其中
            formData.set('enprompt', enprompt);
            // Update input field with new value

            const sd_api_url = "http://103.213.161.39:7860"
            const sdRoutePath='/sdapi/v1/txt2img'
        
            
        
            try {
                // enprompt = formData.get('enprompt')
                // console.log(enprompt)
                const sdbody = createTxt2img({
                    prompt:enprompt,
                    override_settings:{
                        sd_model_checkpoint
                }})
                // console.log(sdbody)
                
                const res = await fetch(sd_api_url+sdRoutePath, {
                    method: 'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify(sdbody),
                })
              const data = await res.json()
        
              console.log(data)
        
              // console.log(data.images);
              setImgCode(data.images[0]) // 更新 imgCode 状态
            } catch (error) {
              console.error('Error:', error)
            } finally {
              setIsLoading(false) // 隐藏加载状态
              setIsButtonDisabled(false) // 启用按钮
            }

            
            
        } catch (error) {
            console.error('Error:', error)
        } finally {
            
        }
        
    }
    

  };

  return (
    <>

    <Link href='/home' className="btn btn-outline btn-primary text-xl m-2">
        返回首页
      </Link>
    <div className="flex justify-center items-center h-screen">  
 
      <form onSubmit={handleSubmit} className="w-2/3 p-8 rounded-lg shadow-lg">
      <div><h1 className='font-bold text-4xl text-center m-8'>文生图 Txt2Image</h1></div>
        <div className="mb-4">
          <textarea
            className="textarea textarea-bordered w-full h-24"
            placeholder="输入图片的中文描述..."
            name='cnprompt'
          />
        </div>
        <div className="mb-4">
          <textarea
            className="textarea textarea-bordered w-full h-24"
            placeholder="英文描述..."
            name='enprompt'
            value={enprompt}
            disabled
          />
        </div>
        <div className="mb-4 flex justify-center">
          <ModelsSelectorWrapper />
        </div>
        <div className="mb-4 flex justify-center">
          <button
            className="btn w-full text-2xl text-pretty btn-primary"
            type="submit"
            disabled={isButtonDisabled}
          >
            {isLoading ? '稍等，AI计算中...' : '生成图像'}
          </button>
        </div>

        {/* <ProgressBar isLoading={isLoading} />  */}

        <div className="flex justify-center">
          {isLoading ? (
            // <Spinner /> // 显示加载动画
            <Loading /> // 显示加载动画
          ) : imgCode ? (
            <img src={`data:image/png;base64,${imgCode}`} width="512" alt="生成的图像" />
          ) : null}
        </div>
      </form>
    </div>
    </>
  );
}