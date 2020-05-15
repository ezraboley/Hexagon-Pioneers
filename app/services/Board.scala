package services

import scala.collection.mutable.ListBuffer
import play.api.libs.json._
import javax.inject._

@Singleton
class Board @Inject()(_size:Tuple2[Int,Int]) {
  private val towns = new ListBuffer[Town]()
  val size = _size

  def addTown(town: Town) = 
    towns += town
  
  def getTowns: List[Town] = towns.toList

  implicit val townWrites = (new Town(null, null, null, null)).convToJson

  val convToJson = new Writes[Board] {
    def writes(board: Board) = Json.obj(
      "towns" -> board.getTowns,
      "size"  -> size
    )
  }

}
