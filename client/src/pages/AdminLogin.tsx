import { useState } from "react";
import { useLocation } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AdminLogin(){
 const [, setLocation] = useLocation();
 const [password,setPassword]=useState("");
 const handleLogin=(e:any)=>{
  e.preventDefault();
  if(password==="Navkar123"){
    localStorage.setItem("admin_access","true");
    toast.success("Login successful");
    setLocation('/admin');
  } else {
    toast.error("Wrong password");
  }
 };
 return <div className="min-h-screen flex items-center justify-center bg-background p-4">
   <form onSubmit={handleLogin} className="w-full max-w-md border rounded-2xl p-6 space-y-4 bg-card">
    <h1 className="text-3xl font-bold">Secret Admin Login</h1>
    <p className="text-sm text-muted-foreground">Owner access only</p>
    <Input type="password" placeholder="Enter password" value={password} onChange={e=>setPassword(e.target.value)} />
    <Button className="w-full" type="submit">Login</Button>
   </form>
 </div>
}
