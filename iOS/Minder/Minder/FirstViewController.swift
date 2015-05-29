//
//  FirstViewController.swift
//  Minder
//
//  Created by neXus on 27.05.15.
//  Copyright (c) 2015 neXus. All rights reserved.
//

import UIKit

class FirstViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    @IBOutlet weak var txtMind: UITextField!
    @IBAction func btnAddMind(sender: UIButton) {
       
        let json: JSON = JSON(data: NSData(contentsOfURL: NSURL(string: "http://jsonplaceholder.typicode.com/posts")!)!)

        UIAlertView(
            title: "Profit!",
            message: json[0, "title"].stringValue,
            delegate: nil,
            cancelButtonTitle: "OK"
            ).show()
        
/*        if let dataFromString = "{\"name\":\"John\",\"age\":32,\"phoneNumbers\":[{\"type\":\"home\",\"number\":\"212 555-1234\"}]}".dataUsingEncoding(NSUTF8StringEncoding, allowLossyConversion: false) {
            let json = JSON(data: dataFromString)
             UIAlertView(title: json.error?.description, message: json["name"].string, delegate: nil, cancelButtonTitle:"OK").show()
        }*/
    }
}

