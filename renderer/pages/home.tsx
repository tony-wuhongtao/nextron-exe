import React from 'react'
import Link from 'next/link'


export default function HomePage() {
  return (
    
    <section className='pt-20 lg:pt-[120px] pb-20 lg:pb-[120px]'>
      <div className='container flex justify-center relative'>

        <Link href='/videos' className="btn btn-outline btn-primary text-2xl mr-6">
          同上一堂课 小学重难点 课程智能推荐
        </Link>
        <Link href='/sd' className="btn btn-outline btn-primary text-2xl mr-6">
          AI作画 演示版
        </Link>
      </div>
    </section>
  )
}
