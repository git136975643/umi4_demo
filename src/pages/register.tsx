import React, { useState } from "react"
import TextInput from "@/components/TextInput"
import Button from "@/components/Button"
// @ts-ignore
import { history } from "umi"

export default function () {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const avatarUrl = "https://joeschmoe.io/api/v1/random"

  async function submit() {
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({ email, password, name, avatarUrl }),
        headers: {
          "Content-Type": "application/json"
        }
      })
      if (res.status !== 200) {
        console.error(await res.text())
        return
      }
      const data = await res.json()
      alert(`欢迎回来，${data.name}`)
      history.push("/login")
      // history.push("/posts/create")
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="w-full flex justify-center">
      <div className="container lg:px-64 px-8 pt-16">
        <p className="text-3xl font-extrabold">用户注册</p>
        <div className="mt-8">
          <p>邮箱</p>
          <TextInput value={email} onChange={setEmail} />
          <p className="mt-4">密码</p>
          <TextInput type="password" value={password} onChange={setPassword} />

          <p>用户名</p>
          <TextInput value={name} onChange={setName} />
          <Button onClick={submit}>登入</Button>
        </div>
      </div>
    </div>
  )
}
