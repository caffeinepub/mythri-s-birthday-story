import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Int "mo:core/Int";

actor {
  type Wish = {
    name : Text;
    message : Text;
    timestamp : Time.Time;
  };

  module Wish {
    public func compareByTimestamp(w1 : Wish, w2 : Wish) : Order.Order {
      Int.compare(w1.timestamp, w2.timestamp);
    };

    public func compareByName(w1 : Wish, w2 : Wish) : Order.Order {
      Text.compare(w1.name, w2.name);
    };
  };

  let wishes = Map.empty<Text, Wish>();

  var nextId = 0;

  public shared ({ caller }) func addWish(name : Text, message : Text) : async () {
    let wish : Wish = {
      name;
      message;
      timestamp = Time.now();
    };
    wishes.add(nextId.toText(), wish);
    nextId += 1;
  };

  public query ({ caller }) func getAllWishes() : async [Wish] {
    wishes.values().toArray().sort(Wish.compareByTimestamp);
  };

  public query ({ caller }) func getAllWishesByName() : async [Wish] {
    wishes.values().toArray().sort(Wish.compareByName);
  };

  public query ({ caller }) func getWish(id : Text) : async Wish {
    switch (wishes.get(id)) {
      case (null) { Runtime.trap("Wish does not exist") };
      case (?wish) { wish };
    };
  };
};
