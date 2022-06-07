import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const AboutPage = () => {
  return (
    <>
      <MetaTags title="About" description="About page" />
      <h1 className="md:text-3xl text-2xl">About</h1>
      <div className="grid grid-cols-2 ">
        <div className="col-span-2 md:col-span-1">
          <p className="mt-2">
            Welcome to <b>HybridTerritory</b> — A simple territory management
            system that’s designed for the quick changing landscape of hybrid
            witnessing.
          </p>
          <p className="mt-2">
            We'll take one step at a time to get things figured out.
          </p>
        </div>
        <div className="col-span-2 md:col-span-1">
          <img
            className="rounded-sm shadow"
            src="https://images.unsplash.com/photo-1654525481564-9d421b2e51f3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
            alt=""
          />
        </div>
      </div>
    </>
  )
}

export default AboutPage
