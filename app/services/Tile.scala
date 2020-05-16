package services

import play.api.libs.json._
import javax.inject._

case class Point (x : Int, y : Int, z : Int);

class Tile @Inject()(_id: Int, _res: Resource, _number: Int, _pos: Point) {
  val id = _id
  val res = _res
  val number = _number

  val pos = _pos

  implicit val resWrites = (new Resource("")).convToJson

  val convToJson = new Writes[Tile] {
    def writes(tile: Tile) = Json.obj(
      "id"      -> tile.id,
      "res"     -> tile.res,
      "number"  -> tile.number
    )
  }
}
