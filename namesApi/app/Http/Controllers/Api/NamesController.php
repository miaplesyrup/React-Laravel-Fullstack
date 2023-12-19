<?php

namespace App\Http\Controllers\Api;

use App\Models\Names;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class NamesController extends Controller
{
    public function index()
    {
        $names = Names::all();
        if ($names->count() > 0){
            return response()->json([
                'status' => 200,
                'names' => $names
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No records found'
            ], 404);
        }
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'firstName' => 'required|string',
            'lastName' => 'required|string',
            'email' => 'required|email|string',
            'address' => 'required|string',
            'phone' => 'required|digits:11',
        ]);

        if($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->errors()
            ], 422);
        }else{
            $names = Names::create([
                'firstName'=>$request['firstName'],
                'lastName'=>$request['lastName'],
                'email'=>$request['email'],
                'address'=>$request['address'],
                'phone'=>$request['phone']
            ]);

            if($names){
                return response()->json([
                    'status' => 200,
                    'message' => "Record has been created successfully"
                ], 200);
            }else{
                return response()->json([
                    'status' => 500,
                    'message' => "Something went wrong."
                ], 500);
            }
        }
    }

    public function show($id) 
    {
        $names = Names::find($id);
        if($names) {
            return response()->json([
                'status' => 200,
                'name' => $names
            ], 200);

        }else{
            return response()->json([
                'status' => 404,
                'message' => "It does not exist."
            ], 500);
        }
    }

    public function edit($id)
    {
        $names = Names::find($id);
        if($names) {
            return response()->json([
                'status' => 200,
                'name' => $names
            ], 200);

        }else{
            return response()->json([
                'status' => 404,
                'message' => "It does not exist."
            ], 500);
        }
    }

    public function update(Request $request, int $id)
    {
        $validator = Validator::make($request->all(), [
            'firstName' => 'required|string',
            'lastName' => 'required|string',
            'email' => 'required|email|string',
            'address' => 'required|string',
            'phone' => 'required|digits:11',
        ]);

        if($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->errors()
            ], 422);
        }else{
            $names = Names::find($id);
            if($names){
                $names->update([
                    'firstName'=>$request['firstName'],
                    'lastName'=>$request['lastName'],
                    'email'=>$request['email'],
                    'address'=>$request['address'],
                    'phone'=>$request['phone']
                ]);
                return response()->json([
                    'status' => 200,
                    'message' => "Record has been updated successfully"
                ], 200);
            }else{
                return response()->json([
                    'status' => 404,
                    'message' => "It does not exist"
                ], 404);
            }
        }
    }

    public function destroy($id)
    {
        $name = Names::find($id);
        if($name){
            $name->delete();
            return response()->json([
                'status' => 200,
                'message' => "Name has been deleted"
            ], 404);
        }else{
            return response()->json([
                'status' => 404,
                'message' => "It does not exist"
            ], 404);
        }
    }
}
