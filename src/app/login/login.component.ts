import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  signupvisibleFlag:boolean = false;
  signinvisibleFlag:boolean = true;
  loginMsg = '';
  signupMsg = '';
  luname:string;
  lpwd:string;
  isFormNotProper = true;
  fname:string;
  uname:string;
  pwd:string;
  email:string;
  getInputValue=(event)=>
  {
  this[event.target.name] = event.target.value;
    if(event.target.type=='email')
     {
        this.isFormNotProper = true;
        this.signupMsg='';
        var email = event.target.value;
        var atTheRate = email.indexOf('@');
        var dot = email.indexOf(".");
        this.signupMsg='Invalid e-mail address !';
        console.log("dot : ",dot+" atTheRate : ",atTheRate);
        if(dot>atTheRate && atTheRate>0 && dot>1)
        {
          this.signupMsg = 'e-mail address has been varified !';
          this.isFormNotProper = false;
            setTimeout(()=>{
              this.signupMsg = '';
            },4000)
        }
      }  
  }
  
  signIn=()=>
  {
    if(this.luname || this.lpwd)
      {
        this.loginMsg = 'trying....';

          let req = new XMLHttpRequest();
          const serverAddress = 'http://127.0.0.1:8080/signin';

          req.open('post',serverAddress,true);
          req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
          req.send("uname="+this.luname+"&pwd="+this.lpwd);
          
          req.onreadystatechange=()=>
          {
            if(req.readyState==4 && req.status==200)
            {
              var receivedItems = JSON.parse(req.responseText);
                if(receivedItems.success==true)
                {
                  localStorage.setItem("token",receivedItems.data_with_signKey);
                  this.loginMsg = receivedItems.msg;
                  this.router.navigate(["/dashboard"]);
                }
                else if(receivedItems.success==false)
                {
                  this.loginMsg = receivedItems.msg;
                    setTimeout(()=>
                    {
                    this.loginMsg = '';
                    },4000);
                }
            }
          }
      }

    else
    alert("Please enter proper Credential !");
  }
  signUp=()=>
  {
    this.signupMsg = 'trying....';
      let req = new XMLHttpRequest();
      const serverAddress = 'http://127.0.0.1:8080/signup';
      
      req.open('post',serverAddress,true);

      req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      req.send("fname="+this.fname+"&uname="+this.uname+"&pwd="+this.pwd+"&email="+this.email);

      req.onreadystatechange=()=>
      {
        if(req.readyState==4 && req.status==200)
        {
          var receivedItems = JSON.parse(req.responseText);
          //console.log(receivedItems);
          this.signupMsg = receivedItems;
            setTimeout(()=>
            {
              this.signupMsg = '';
              this.signupvisibleFlag = !this.signupvisibleFlag;
              this.signinvisibleFlag = !this.signinvisibleFlag;
            },4000);
        }
      }
     
  }

  showSignup=()=>{
    this.signupvisibleFlag = !this.signupvisibleFlag;
    this.signinvisibleFlag = !this.signinvisibleFlag;
  }
  
  cancelSignup=()=>{
    this.signupvisibleFlag = !this.signupvisibleFlag;
    this.signinvisibleFlag = !this.signinvisibleFlag;
  }
}

