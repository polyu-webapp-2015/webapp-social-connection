# overall design (client-server communication)
## CORBA IDL
###### common object request broker architecture
###### interface defining language
This part define the interface for the object involved in the client-server.
It helps defining the non-implemented method.

All the attribute and method declared here are public.
And will be invoked by the other.

private stuff and implement detail should not be mentioned here.

The .idl can generate stub and skeleton
 - stub is the "server" on the client, the method there are call by the client on the runtime
 - skeleton is the "client" on the server

## remark
work on main.idl directly, the user.idl and group.idl are deprecated

## to team member (from Beeno)
If you do not know how to write IDL language, you and look at the demo .idl files under folder "demo".
Or you can just write your input-output requirement in the google doc.
